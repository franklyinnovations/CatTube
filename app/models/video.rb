class Video < ActiveRecord::Base
	include PgSearch
	pg_search_scope :search_by_title, against: :title, using: {tsearch: {prefix: true}}, order_within_rank: "videos.updated_at DESC"

	belongs_to :user
	has_many :comments, dependent: :destroy
	has_many :likes, dependent: :destroy
	has_many :views, dependent: :destroy

	validates :title, :description, presence: true
	validates :title, length: { in: (1..100) }
	validates :description, length: { in: (1..1000) }
	validates :user, presence: true

	has_attached_file :data, :styles => {
    :thumb => { :geometry => "400x220", :time_offset => 10 }
  }, :processors => [:video_thumbnail]

	validates_attachment :data, presence: true, content_type: { content_type: /\Avideo\/mp4\z/ }, size: { in: (0..50_000_000) }

	def total_views
		self.views.size
	end

	def created_at_date
		self.updated_at.strftime('%b %-d, %Y')
	end

	def created_ago
		ActionController::Base.helpers.time_ago_in_words(self.updated_at)
	end

	def sibling_videos
		author_id = self.user_id
		Video.all.where("videos.user_id = ? AND videos.id != ?", author_id, self.id)
	end

end
