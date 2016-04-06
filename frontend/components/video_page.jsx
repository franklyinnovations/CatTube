var React = require('react');

var ApiUtils = require('../utils/api_utils');
var VideoStore = require('../stores/video_page/video_store');

var VideoBar = require('./video_page/video_bar');
var VideoIndex = require('./video_page/video_index');
var Video = require('./video_page/video');
var CommentIndex = require('./video_page/comment_index');
var AddComment = require('./video_page/add_comment');

var VideoPage = React.createClass({

	getInitialState: function () {
		return {video: null};
	},

	componentDidMount: function () {
		this.storeToken = VideoStore.addListener(this._onChange);
		ApiUtils.getVideoById(this.props.params.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({video: VideoStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getVideoById(newProps.params.videoId);
	},

	render: function() {
		return (
			<div className='video-page'>
				<Video video={this.state.video}/>
				<VideoBar video={this.state.video}/>
				<AddComment videoId={this.props.params.videoId}/>
				<CommentIndex videoId={this.props.params.videoId}/>
				<VideoIndex/>
			</div>
		);
	}

});

module.exports = VideoPage;
