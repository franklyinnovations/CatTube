class Like < ActiveRecord::Base
	belongs_to :user
	belongs_to :video

	validates :user, :video, presence: true
	validates :value, inclusion: { in: [-1, 1] }
end
