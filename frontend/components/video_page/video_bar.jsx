var React = require('react');

var Likes = require('./likes');
var Author = require('./author');

var VideoBar = React.createClass({

	render: function() {
		var video = this.props.video;

		if(video) {
			var author = {
				username: video.username
			};

			return (
				<section className='video-bar'>

					<div className='video-bar-main group'>
						<div className='video-bar-top group'>
							<div className='video-bar-title'>{video.title}</div>
							<Author author={author}/>
							<div className='video-bar-views'>{video.total_views}</div>
						</div>
						<Likes videoId={video.id}/>
					</div>

					<div className='video-bar-other'>
						<div className='video-bar-date'>{
							'Published on ' + video.created_at_date
						}</div>
						<div className='video-bar-description'>{video.description}</div>
					</div>

				</section>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = VideoBar;
