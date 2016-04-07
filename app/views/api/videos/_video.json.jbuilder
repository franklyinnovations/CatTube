json.extract! video, :id, :title, :description, :user_id, :created_at, :updated_at

json.username video.user.username
json.total_views video.total_views
json.url asset_path video.data.url
json.thumb asset_path video.data.url(:thumb)
