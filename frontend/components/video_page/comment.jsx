var React = require('react');

var Comment = React.createClass({

	render: function() {
		var comment = this.props.comment;

		return (
			<ul className='comment'>
				<li>{comment.user_id}</li>
				<li>{comment.body}</li>
				<li>{comment.updated_at}</li>

				{this.props.children}
			</ul>
		);
	}

});

module.exports = Comment;
