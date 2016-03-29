var React = require('react');

var VideoBar = require('./video_page/video_bar');
var VideoIndex = require('./video_page/video_index');
var Video = require('./video_page/video');

var VideoPage = React.createClass({

	render: function() {
		return (
			<div className='video-page'>
				<Video/>
				<VideoBar videoId={this.props.params.videoId}/>
				<VideoIndex/>
			</div>
		);
	}

});

module.exports = VideoPage;
