json.videos @videos do |video|
	json.partial! 'api/videos/video', video: video
end

json.total_videos_size @total_videos_size
