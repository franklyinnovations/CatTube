class Api::CommentsController < ApplicationController
	before_action :ensure_logged_in, only: [:create]
	before_action :ensure_owner, only: [:destroy]

	def index
		video = Video.find(params[:video_id])
		@comments = video.comments.includes(:children).where('comments.parent_id IS NULL')

		render :index
	end

	def create
		@comment = current_user.comments.create!(comment_params)
		render :show
	end

	def destroy
		@comment = current_user.comments.find(params[:id])
		@comment.destroy
		render :show
	end

private

	def comment_params
		params.require(:comment).permit(:body, :video_id)
	end

	def ensure_owner
		if !logged_in?
			render json: { message: 'You must be logged in!' }, status: 401
		elsif Comment.find(params[:id]).user_id != current_user.id
			render json: { message: 'You must be the comment owner!' }, status: 401
		end
	end
end
