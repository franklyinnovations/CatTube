class Video < ActiveRecord::Base
	belongs_to :user
	has_many :comments, dependent: :destroy
	has_many :likes, dependent: :destroy
	has_many :views, dependent: :destroy

	validates :title, :description, presence: true
	validates :title, length: { in: (1..100) }
	validates :description, length: { in: (1..300) }
	validates :user, presence: true

	has_attached_file :data, :styles => {
    # :medium => { :geometry => "640x480", :format => 'flv' },
    :thumb => { :geometry => "200x110#", :format => 'jpg', :time => 0 }
  }, :processors => [:transcoder]

	validates_attachment :data, presence: true, content_type: { content_type: /\Avideo\/mp4\z/ }, size: { in: (0..50_000_000) }

	def total_views
		self.views.size
	end

	def created_at_date
		self.updated_at.strftime('%b %-d, %Y')
	end
end
