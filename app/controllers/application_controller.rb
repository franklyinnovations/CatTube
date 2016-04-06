class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
	if Rails.env.production?
  	protect_from_forgery with: :exception
	end

	def current_user
		@current_user ||= User.find_by(session_token: session[:session_token])
	end

	def log_in!(user)
			user.reset_session_token!
			session[:session_token] = user.session_token
	end

	def log_out!
		current_user.reset_session_token! if current_user
		session[:session_token] = nil;
		@current_user = nil
	end

	def logged_in?
		!!current_user
	end

private

	def ensure_logged_in
		unless logged_in?
			render json: { message: 'You must be logged in!' }, status: 401
		end
	end

	def ensure_logged_out
		if logged_in?
			render json: { message: 'You must be logged out!' }, status: 401
		end
	end
end
