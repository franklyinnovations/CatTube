class Api::VideosController < ApplicationController
	before_action :ensure_logged_in, only: [:create]
	before_action :ensure_owner, only: [:destroy]

	def index
		@videos = Video.all
		render :index
	end

	def create
		@video = current_user.videos.create!(video_params);
		render :show
	end

	def show
		@video = Video.find(params[:id]);
		render :show
	end

	def destroy
		@video = Video.find(params[:id]);
		@video.destroy
		render :show
	end

private

	def ensure_owner
		if !logged_in?
			render json: { message: 'You must be logged in!' }, status: 401
		elsif Video.find(params[:id]).user_id != current_user.id
			render json: { message: 'You must be the video owner!' }, status: 401
		end
	end

	def video_params
		params.require(:video).permit(:title, :description, :data)
	end
end
