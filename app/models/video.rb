class Video < ActiveRecord::Base
	validates :title, :description, :thumbnail, :url, presence: true

	# validates :user, presence: true

private

	def create_thumbnail
	end
end
