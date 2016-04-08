class User < ActiveRecord::Base
	attr_reader :password

	has_many :comments
	has_many :likes
	has_many :videos
	has_many :views

	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :username, format: { with: /\A[A-Za-z][A-Za-z0-9_]*$\z/ }
	validates :username, length: { in: (1..128) }
	validates :password, length: { in: (6..128) }

	after_initialize :ensure_session_token
	after_initialize :ensure_dummy_password

	has_attached_file :avatar,
		styles: { thumb: "100x100>" },
		default_url: "default.jpg"

	validates_attachment :avatar, content_type: { content_type: /\Aimage\/.*\Z/ }

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)

		return nil unless user
		user.is_password?(password) ? user : nil
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(self.password).to_s
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_token!
		self.session_token = SecureRandom::urlsafe_base64

		while	User.exists?(session_token: self.session_token)
			self.session_token = SecureRandom::urlsafe_base64
		end

		self.save!
		self.session_token
	end

private

	def ensure_session_token
		self.session_token = SecureRandom::urlsafe_base64 unless self.session_token
	end

	def ensure_dummy_password
		# allows a User fetched from the database to be saved (pass validation)
		@password = "123456" unless self.password
	end
end
