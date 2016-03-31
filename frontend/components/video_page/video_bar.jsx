var React = require('react');

var Likes = require('./likes');

var VideoBar = React.createClass({

	render: function() {
		var video = this.props.video;

		if(video) {
			return (
				<section className='video-bar'>
					<ul>
						<li>{'Video ID:' + video.id}</li>
						<li>{'Title:' + video.title}</li>
						<li>{'Description:' + video.description}</li>
						<li>{'User:' + video.user_id}</li>
						<li>{'URL:' + video.url}</li>
						<li>{'Created At:' + video.created_at}</li>
						<li>{'Updated At:' + video.updated_at}</li>
						<img src={video.thumb}/>
						<Likes videoId={video.id}/>
					</ul>
				</section>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = VideoBar;
