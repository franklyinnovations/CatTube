var React = require('react');
var Link = require('react-router').Link;

var PopularIndexStore = require('../../stores/home_page/popular_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideosSlider = require('./videos_slider');

var INITIAL_LOAD = 3;

var PopularIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: PopularIndexStore.all()};
	},

	componentDidMount: function () {
		this.page = 1;
		this.storeToken = PopularIndexStore.addListener(this._onChange);

		var loadUntilLimit = function () {
			if(!PopularIndexStore.fullyLoaded() && this.page < INITIAL_LOAD) {
				ApiUtils.getVideoIndexByPageAndTypeAndVideoId(++this.page, "POPULAR", {videoId: this.props.videoId}, loadUntilLimit);
			}
		}.bind(this);

		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "POPULAR", {videoId: this.props.videoId}, loadUntilLimit);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
		// keep only the first INITIAL_LOAD pages, discard the rest
		PopularIndexStore.take(INITIAL_LOAD);
	},

	_onChange: function () {
		this.setState({videoIndex: PopularIndexStore.all()});
	},

	_loadMoreVideos: function () {
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(++this.page, "POPULAR", {videoId: this.props.videoId});
	},

	render: function() {
		var sliders = [];
		var showMoreButton;

		if(!PopularIndexStore.fullyLoaded()) {
			showMoreButton = <button className="popular-index-more" onClick={this._loadMoreVideos}>Load more</button>;
		}

		// convert object to an array
		$.each(this.state.videoIndex, function(page, videoPage) {
			sliders.push(
				<VideosSlider key={page} page={videoPage} />
			);
		});

		return (
			<div className="popular-index">
				<h2 className="popular-index-title">Most Popular</h2>
				<div className="popular-index-sliders">
					{sliders}
				</div>

				{showMoreButton}
			</div>
		);
	}
});

module.exports = PopularIndex;
