class View < ActiveRecord::Base
	belongs_to :user
	belongs_to :video

	validates :video, presence: true
	validate :user_exists_if_present

private

	def user_exists_if_present
		if self.user_id
			begin
				User.find(self.user_id)
			rescue ActiveRecord::RecordNotFound
				self.errors[:user_id] << "#{self.user_id} doesn't exist!"
			end
		end
	end
end
