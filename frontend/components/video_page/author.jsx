var React = require('react');

var Icon = require('./icon');

var Author = React.createClass({

	render: function() {
		var author = this.props.author;
		
		return (
			<div className='author group'>
				<Icon userId={author.userId}/>
				<strong className='author-name'>{author.username}</strong>
			</div>
		);
	}

});

module.exports = Author;
