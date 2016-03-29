var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var VideoStore = require('../../stores/video_page/video_store');

var Video = React.createClass({
	getInitialState: function () {
		return {video: {url: null}};
	},

	componentDidMount: function () {
		this.storeToken = VideoStore.addListener(this._onChange);
		ApiUtils.getVideoById(this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({video: VideoStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getVideoById(newProps.videoId);
	},

	render: function() {
		return (
			<section className='video'>
				<video controls src={this.state.video.url} className='video-player'/>
			</section>
		);
	}

});

module.exports = Video;
