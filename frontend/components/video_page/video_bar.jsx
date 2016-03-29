var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var VideoStore = require('../../stores/video_page/video_store');

var VideoBar = React.createClass({
	getInitialState: function () {
		return {video: null};
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

	render: function() {
		var video = this.state.video;

		if(video) {
			return (
				<section className='video-bar'>
					<ul>
						<li>{'Video ID:' + video.id}</li>
						<li>{'Title:' + video.title}</li>
						<li>{'Description:' + video.description}</li>
						<li>{'User:' + video.user_id}</li>
						<li>{'Thumbnail:' + video.thumbnail}</li>
						<li>{'URL:' + video.url}</li>
						<li>{'Created At:' + video.created_at}</li>
						<li>{'Updated At:' + video.updated_at}</li>
					</ul>
				</section>
			);
		}
		else {
			return <div></div>;
		}
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getVideoById(newProps.videoId);
	}

});

module.exports = VideoBar;
