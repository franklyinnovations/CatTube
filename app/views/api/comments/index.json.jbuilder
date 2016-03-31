json.array! @comments do |comment|
	json.partial! 'api/comments/comment', comment: comment

	json.children comment.children do |children|
		json.partial! 'api/comments/comment', comment: children
	end
end