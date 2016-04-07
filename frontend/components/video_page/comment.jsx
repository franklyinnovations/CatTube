var React = require('react');

var Icon = require('./icon');

var Comment = React.createClass({

	render: function() {
		var comment = this.props.comment;

		return (
			<article className='comment group'>
				<Icon userId={comment.user_id}/>
				<strong className='comment-username'>{comment.username}</strong>
				<strong className='comment-date'>{comment.created_ago}</strong>
				<p>{comment.body}</p>

				{this.props.children}
			</article>
		);
	}

});

module.exports = Comment;
