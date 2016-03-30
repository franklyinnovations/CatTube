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
		foreign_key: :parent_id

	validates :user, :video, :body, presence: true
	validate :parent_exists_if_present

private

	def parent_exists_if_present
		if self.parent_id
			begin
				User.find(self.parent_id)
			rescue ActiveRecord::RecordNotFound
				self.errors[:parent_id] << "#{self.parent_id} doesn't exist!"
			end
		end
	end
end
