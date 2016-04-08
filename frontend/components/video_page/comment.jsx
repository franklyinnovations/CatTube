var React = require('react');

var Icon = require('./icon');
var ReplyComment = require('./reply_comment');

var Comment = React.createClass({

	render: function() {
		var comment = this.props.comment;

		return (
			<article className='comment group'>
				<div className='comment-top group'>
					<div className='comment-avatar group'>
						<Icon userId={comment.user_id}/>
					</div>
					<strong className='comment-username'>{comment.username}</strong>
					<strong className='comment-date'>{comment.created_ago}</strong>
					<p className='comment-body'>{comment.body}</p>
					<ReplyComment parentId={comment.id}/>
				</div>

				{this.props.children}
			</article>
		);
	}

});

module.exports = Comment;
