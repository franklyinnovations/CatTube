class Api::SessionsController < ApplicationController

	def show
		if logged_in?
			@user = current_user
			render :show
		else
			render json: { message: 'Not logged in!' }, status: 401
		end
	end

	def create
		if !logged_in?
			@user = User.find_by_credentials(params[:username], params[:password])

 			if @user
				log_in!(@user)
				render :show
			else
				render json: { message: 'Invalid username and/or password!' }, status: 401
			end
		else
			render json: { message: 'Already logged in!' }, status: 422
		end
	end

	def destroy
		log_out!

		render json: {}
	end

end
