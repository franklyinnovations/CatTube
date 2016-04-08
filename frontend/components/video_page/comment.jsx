var React = require('react');

var Icon = require('./icon');
var ReplyComment = require('./reply_comment');

var Comment = React.createClass({

	render: function() {
		var comment = this.props.comment;
		var replyComment;

		if(this.props.comment.parent_id === null) {
			var videoId = comment.video_id.toString();
			replyComment = <ReplyComment parentId={comment.id} videoId={videoId}/>;
		}

		return (
			<article className='comment'>
				<div className='comment-top'>
					<div className='comment-avatar group'>
						<Icon userId={comment.user_id}/>
					</div>
					<strong className='comment-username'>{comment.username}</strong>
					<strong className='comment-date'>{comment.created_ago}</strong>
					<p className='comment-body'>{comment.body}</p>
					{replyComment}
				</div>

				{this.props.children}
			</article>
		);
	}

});

module.exports = Comment;
