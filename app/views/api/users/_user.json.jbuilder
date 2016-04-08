json.extract! user, :id, :username

json.thumb asset_path user.avatar.url(:thumb)
