var React = require('react');

var Author = React.createClass({

	render: function() {
		return (
			<div className='author group'>
				<div className='author-icon'></div>
				<strong className='author-name'>{
					this.props.author.username
				}</strong>
			</div>
		);
	}

});

module.exports = Author;
