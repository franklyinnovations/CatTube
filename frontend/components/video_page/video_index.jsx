var React = require('react');
var Link = require('react-router').Link;

var VideoIndexStore = require('../../stores/video_page/video_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideoIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: VideoIndexStore.all()};
	},

	componentDidMount: function () {
		this.storeToken = VideoIndexStore.addListener(this._onChange);
		// get only the first page for now
		ApiUtils.getVideoIndex(1);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({videoIndex: VideoIndexStore.all()});
	},

	render: function() {
		var videoIndex = this.state.videoIndex;
		var output = [];

		// go through each page in the videoIndex and for each page, extract videos
		for(var p in videoIndex) {
			if(videoIndex.hasOwnProperty(p)) {
				var currPage = videoIndex[p];
				for(var i = 0; i < currPage.length; i++) {
					output.push(currPage[i]);
				}
			}
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
			}</section>
		);
	}
});

module.exports = VideoIndex;
