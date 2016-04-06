class Video < ActiveRecord::Base
	belongs_to :user
	has_many :comments, dependent: :destroy
	has_many :likes, dependent: :destroy
	has_many :views, dependent: :destroy

	validates :title, :description, presence: true
	validates :user, presence: true

	has_attached_file :data, :styles => {
    # :medium => { :geometry => "640x480", :format => 'flv' },
    :thumb => { :geometry => "200x110#", :format => 'jpg', :time => 0 }
  }, :processors => [:transcoder]

	validates_attachment :data,  content_type: { content_type: /\Avideo\/.*\z/ }, size: { in: (0..50_000_000) }

	def total_views
		self.views.size
	end

end
