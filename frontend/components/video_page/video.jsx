var React = require('react');

var Video = React.createClass({

	render: function() {
		return (
			<section className='video'>
				<video controls className='video-player'>
					<source src="" className='video-player-source'></source>
				</video>
			</section>
		);
	}

});

module.exports = Video;
