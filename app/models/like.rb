class Like < ActiveRecord::Base
	belongs_to :user
	belongs_to :video

	validates :user, :video, presence: true
	validates :value, inclusion: { in: [-1, 1] }
	validates :user, uniqueness: { scope: :video }

	validate :cannot_like_own_video

	def self.up_total(likes)
		count = 0
		likes.each { |like| count += 1 if like.value == 1 }
		count
	end

	def self.down_total(likes)
		count = 0
		likes.each { |like| count += 1 if like.value == -1 }
		count
	end

private

	def cannot_like_own_video
		if user_id == video.user.id
			self.errors[:user_id] << "#{user_id} cannot like their own video!"
		end
	end
end
