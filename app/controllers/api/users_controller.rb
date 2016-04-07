class Api::UsersController < ApplicationController
	before_action :ensure_logged_out, only: [:create]

	def index
		@users = User.all
		render :index
	end

	def create
		@user = User.create!(user_params)
		log_in!(@user)
		render :show
	end

	def show
		@user = User.find(params[:id]);
		render :show
	end

private

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
