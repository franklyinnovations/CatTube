json.extract! comment, :id, :body, :user_id, :video_id, :parent_id

json.username comment.user.username
json.created_ago comment.created_ago
