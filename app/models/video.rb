class Video < ActiveRecord::Base
	belongs_to :user
	has_many :comments
	has_many :likes

	validates :title, :description, :thumbnail, :url, presence: true
	validates :user, presence: true

private

	def create_thumbnail
	end
end
