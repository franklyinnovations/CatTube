var React = require('react');
var Link = require('react-router').Link;

var VideoIndexStore = require('../../stores/video_page/video_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideoIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: VideoIndexStore.all()};
	},

	componentDidMount: function () {
		this.page = 1;
		this.storeToken = VideoIndexStore.addListener(this._onChange);
		// get only the first page for now
		ApiUtils.getVideoIndexByPageAndVideoId(1, this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	componentWillReceiveProps: function (newProps) {
		// doesn't really do anything at the moment (VideoIndexStore may be cleared in the future from a ApiUtils call)
		this.page = 1;
		ApiUtils.getVideoIndexByPageAndVideoId(1, this.props.videoId);
	},

	_onChange: function () {
		this.setState({videoIndex: VideoIndexStore.all()});
	},

	_showMoreVideos: function () {
		ApiUtils.getVideoIndexByPageAndVideoId(++this.page, this.props.videoId);
	},

	render: function() {
		var videoIndex = this.state.videoIndex;
		var output = [];
		var showMoreButton;

		// go through each page in the videoIndex and for each page, extract videos
		for(var p in videoIndex) {
			if(videoIndex.hasOwnProperty(p)) {
				var currPage = videoIndex[p];
				for(var i = 0; i < currPage.length; i++) {
					output.push(currPage[i]);
				}
			}
		}

		// render Show More button if not all videos are loaded
		if(!VideoIndexStore.fullyLoaded()) {
			showMoreButton = (
				<button onClick={this._showMoreVideos} className='video-index-more'>
					Show More
				</button>
			);
		}

		return (
			<section className='video-index'>{
				output.map( function (video) {
					return (
						<Link to={'/videos/' + video.id} className='video-index-item group' key={video.id}>
							<img className='video-index-thumb' src={video.thumb}/>
							<strong className='video-index-title'>{video.title}</strong>
							<strong className='video-index-username'>{video.username}</strong>
							<strong className='video-index-views'>{video.total_views} views</strong>
						</Link>
					);
				})
			}{
				showMoreButton
			}</section>
		);
	}
});

module.exports = VideoIndex;
