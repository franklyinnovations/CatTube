class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

	def current_user
		# temporary hack before user auth and login
		if User.all.length == 0
			User.create!(username: 'default_user', password: 'foobar')
		end

		@current_user ||= User.all.first
	end
end
