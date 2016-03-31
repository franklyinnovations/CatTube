class Api::VideosController < ApplicationController
	def index
		@videos = Video.all
		render :index
	end

	def create
		debugger
		@video = Video.create!(video_params);
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
	end
end
