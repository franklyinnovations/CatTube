json.comments @comments do |comment|
	json.partial! 'api/comments/comment', comment: comment

	json.children comment.children do |children|
		json.partial! 'api/comments/comment', comment: children
	end
end

json.total_comments_size @total_comments_size
