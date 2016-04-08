class Api::LikesController < ApplicationController
	before_action :ensure_logged_in, only: [:create]

	def index
		raw_likes = Video.find(params[:video_id]).likes

		# only return the aggregate likes
		@likes = {up: Like.up_total(raw_likes), down: Like.down_total(raw_likes)}
		render :index
	end

	def show
		current_user_id = current_user.nil? ? nil : current_user.id
		@like = Like.find_by(video_id: params[:video_id], user_id: current_user_id)

		# to signify no Like was found for the video_id and current user
		if @like.nil?
			@like = Like.new(id: nil, video_id: nil, user_id: nil, value: nil)
		end

		render :show
	end

	def create
		# check if the current user already liked the video in the past
		target_video_id = params[:video_id]
		previous_like = current_user.likes.find_by(video_id: target_video_id)

		if previous_like
			previous_like.update!(value: params[:like][:value])
			@like = previous_like
		else
			@like = current_user.likes.new(like_params)
			@like.video_id = target_video_id
			@like.save!
		end

		render :show
	end

private

	def like_params
		params.require(:like).permit(:value)
	end
end
