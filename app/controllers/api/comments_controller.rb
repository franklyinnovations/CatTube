class Api::CommentsController < ApplicationController
	def index
		video = Video.find(params[:video_id])
		@comments = video.comments
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
end
