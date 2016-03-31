class Api::VideosController < ApplicationController
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

	def video_params
		params.require(:video).permit(:title, :description, :data)
	end
end
