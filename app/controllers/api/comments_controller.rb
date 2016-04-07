class Api::CommentsController < ApplicationController
	before_action :ensure_logged_in, only: [:create]
	before_action :ensure_owner, only: [:destroy]

	def index
		video = Video.find(params[:video_id])
		@comments = video.comments.includes(:children, :user).where('comments.parent_id IS NULL').page(params[:page]).per(10)
		@comments_size = video.comments.size
		render :index
	end

	def create
		@comment = current_user.comments.new(comment_params)
		@comment.video_id = params[:video_id]
		@comment.save!
		render :show
	end

	def destroy
		@comment = current_user.comments.find(params[:id])
		@comment.destroy
		render :show
	end

private

	def comment_params
		params.require(:comment).permit(:body, :parent_id)
	end

	def ensure_owner
		if !logged_in?
			render json: { message: 'You must be logged in!' }, status: 401
		elsif Comment.find(params[:id]).user_id != current_user.id
			render json: { message: 'You must be the comment owner!' }, status: 401
		end
	end
end
