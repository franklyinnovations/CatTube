var React = require('react');

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
						<ul className='video-index-item' key={video.id}>
							<li>Title: {video.title}</li>
							<li>User: {video.user_id}</li>
							<li>Views: {video.views}</li>
							<li>Date: {video.updated_at}</li>
							<img src={video.thumb}/>
						</ul>
					);
				})
			}</section>
		);
	}
});

module.exports = VideoIndex;
