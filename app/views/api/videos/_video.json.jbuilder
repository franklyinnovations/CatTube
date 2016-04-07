json.extract! video, :id, :title, :description, :user_id

json.created_at_date video.created_at_date
json.username video.user.username
json.total_views video.total_views
json.url asset_path video.data.url
json.thumb asset_path video.data.url(:thumb)
