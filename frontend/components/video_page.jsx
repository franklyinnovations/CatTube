var React = require('react');

var ApiUtils = require('../utils/api_utils');
var VideoStore = require('../stores/video_page/video_store');

var VideoBar = require('./video_page/video_bar');
var VideoIndex = require('./video_page/video_index');
var Video = require('./video_page/video');
var CommentIndex = require('./video_page/comment_index');

var VideoPage = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {video: null};
	},

	componentDidMount: function () {
		this.storeToken = VideoStore.addListener(this._onChange);
		ApiUtils.getVideoById(this.props.params.videoId, null, this._videoNotFound);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({video: VideoStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getVideoById(newProps.params.videoId, null, this._videoNotFound);
	},

	_videoNotFound: function () {
		this.context.router.push({pathname: '/404'});
	},

	updateParentHeight: function() {
		var leftColumnHeight =
			$(".video").outerHeight(true) +
			$(".video-bar").outerHeight(true) +
			$(".comment-index").outerHeight(true);
		var rightColumnHeight = $(".video-index").outerHeight();

		var newHeight = (leftColumnHeight > rightColumnHeight) ? leftColumnHeight : rightColumnHeight;
		$(".video-page").height(newHeight);
	},

	render: function() {
		return (
			<div className='video-page group'>
				<Video video={this.state.video}/>
				<VideoBar video={this.state.video}/>
				<CommentIndex videoId={this.props.params.videoId} updateParentHeight={this.updateParentHeight}/>
				<VideoIndex videoId={this.props.params.videoId} updateParentHeight={this.updateParentHeight}/>
			</div>
		);
	}

});

module.exports = VideoPage;
