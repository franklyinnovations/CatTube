class Comment < ActiveRecord::Base
	belongs_to :user
	belongs_to :video

	belongs_to :parent,
		class_name: 'Comment',
		primary_key: :id,
		foreign_key: :parent_id

	has_many :children,
		class_name: 'Comment',
		primary_key: :id,
		foreign_key: :parent_id,
		dependent: :destroy

	validates :user, :video, :body, presence: true
	validates :body, length: { in: (1..500) }
	validate :parent_exists_if_present, :parent_is_not_nested

	def created_ago
		ActionController::Base.helpers.time_ago_in_words(self.updated_at)
	end

private

	def parent_exists_if_present
		if self.parent_id
			begin
				Comment.find(self.parent_id)
			rescue ActiveRecord::RecordNotFound
				self.errors[:parent_id] << "#{self.parent_id} doesn't exist!"
			end
		end
	end

	def parent_is_not_nested
		# if the parent exists and it has a parent
		if self.parent && self.parent.parent
			self.errors[:parent_id] << "#{self.parent_id} can't be a nested comment!"
		end
	end
end
