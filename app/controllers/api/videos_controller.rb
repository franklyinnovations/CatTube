class Api::VideosController < ApplicationController
	before_action :ensure_logged_in, only: [:create]
	before_action :ensure_owner, only: [:destroy]

	PER_PAGE = 10

	def index
		request_type = params[:type]

		begin
			requested_page = Integer(params[:page])
		rescue
			render json: {message: "Invalid page!"}, status: 422
			return
		end

		case request_type
		when "POPULAR"
			results = Api::VideosController.get_popular_videos(requested_page)
		when "RECOMMENDED"
			if logged_in?
				results = Api::VideosController.get_recommended_videos(current_user)
			else
				render json: {message: "Can't get recommended when not logged in!"}, status: 401
				return
			end
		when "WATCHED"
			if logged_in?
				results = Api::VideosController.get_watched_videos(current_user)
			else
				render json: {message: "Can't get watched when not logged in!"}, status: 401
				return
			end
		when "FEATURED"
			results = Api::VideosController.get_featured_videos
		when "SEARCH", "SUGGESTED"
			results = Api::VideosController.search_videos(params[:search_string], requested_page)
		else
			render json: {message: "Invalid search type!"}, status: 422
			return
		end

		@videos = results[0]
		@total_videos_size = results[1]

		render :index
	end

	def create
		begin
			@video = current_user.videos.create!(video_params);
			render :show
		rescue ActiveRecord::RecordInvalid => e
			render json: {message: e.record.errors.full_messages.join(', ')}, status: 422
		end
	end

	def show
		@video = Video.find(params[:id]);

		# assign a view to the served video
		user_id = logged_in? ? current_user.id : nil
		@video.views.create!(user_id: user_id)

		render :show
	end

	def destroy
		@video = Video.find(params[:id]);
		@video.destroy
		render :show
	end

	def self.search_videos(search_string, curr_page = 1)
		results = Video.search_by_title(search_string).page(curr_page).per(PER_PAGE)
		[results, results.size]
	end

	def self.get_featured_videos
		# select the latest videos from the user with the most total views
		results = Video.find_by_sql(<<-SQL)
			SELECT
				videos.*
			FROM
				videos
			WHERE
				videos.user_id IN
				(
					SELECT
						users.id
					FROM
						views
					INNER JOIN
						videos
					ON
						views.video_id = videos.id
					INNER JOIN
						users
					ON
						videos.user_id = users.id
					GROUP BY
						users.id
					HAVING
						COUNT(DISTINCT videos.id) >= #{PER_PAGE}
					ORDER BY
						COUNT(views.id) DESC
					LIMIT
						1
				)
			ORDER BY
				videos.updated_at DESC
			LIMIT
				4
		SQL

		return [results, results.size]
	end

	def self.get_watched_videos(arg_user)
		# select the videos the arg_user has already watched, starting with the latest one
		results = Video.find_by_sql(<<-SQL)
			SELECT
				videos.*
			FROM
				videos
			INNER JOIN
				views
			ON
				videos.id = views.video_id
			WHERE
				views.user_id = #{arg_user.id}
			GROUP BY
				videos.id
			ORDER BY
				MAX(views.updated_at) DESC
			LIMIT
				#{PER_PAGE}
		SQL

		return [results, results.size]
	end

	def self.get_popular_videos(curr_page = 1)
		# select the most popular videos, ordered by view count
		results = Video.find_by_sql(<<-SQL)
			SELECT
				videos.*
			FROM
				videos
			INNER JOIN
			(
				SELECT
					videos.id AS popular_video, COUNT(views.id) AS views_for_video
				FROM
					views
				INNER JOIN
					videos ON views.video_id = videos.id
				GROUP BY
					videos.id
			) AS results
			ON
				videos.id = results.popular_video
			ORDER BY
				results.views_for_video DESC, results.popular_video DESC
			OFFSET
				#{PER_PAGE * (curr_page - 1)}
			LIMIT
				#{PER_PAGE}
		SQL

		# note this isn't the same as the total number of all videos
		total_viewed_videos = View.group(:video_id).count.size
		return [results, total_viewed_videos]
	end

	def self.get_recommended_videos(arg_user)
		# get the videos by the authors that were also the authors for the videos watched by the user previously
		results = Video.find_by_sql(<<-SQL)
			SELECT
				videos.*
			FROM
				videos
			INNER JOIN
			(
				SELECT
					users.id AS recommended_user_id, COUNT(views.id) AS views_for_user
				FROM
					views
				INNER JOIN
					videos ON views.video_id = videos.id
				INNER JOIN
					users ON videos.user_id = users.id
				WHERE
					views.user_id = #{arg_user.id} AND users.id != #{arg_user.id}
				GROUP BY
					users.id
			) AS results
			ON
				videos.user_id = results.recommended_user_id
			WHERE
				videos.id NOT IN
				(
					SELECT
						views.video_id
					FROM
						views
					WHERE
						views.user_id = #{arg_user.id}
				)
			ORDER BY
				results.views_for_user DESC, results.recommended_user_id DESC
			LIMIT
				#{PER_PAGE}
		SQL

		# results = results[(curr_page - 1) * PER_PAGE...(curr_page * PER_PAGE)]
		return [results, results.size]
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
