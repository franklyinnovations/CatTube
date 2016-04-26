var React = require('react');
var Link = require('react-router').Link;

var PopularIndexStore = require('../../stores/home_page/popular_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideosSlider = require('./videos_slider');

var PopularIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: PopularIndexStore.all()};
	},

	componentDidMount: function () {
		this.page = 1;
		this.storeToken = PopularIndexStore.addListener(this._onChange);
		var limit = 5;

		var loadUntilLimit = function () {
			if(!PopularIndexStore.fullyLoaded() && this.page < limit) {
				ApiUtils.getVideoIndexByPageAndTypeAndVideoId(++this.page, "POPULAR", this.props.videoId, loadUntilLimit);
			}
		}.bind(this);

		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "POPULAR", this.props.videoId, loadUntilLimit);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	componentWillReceiveProps: function (newProps) {
		this.page = 1;
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "POPULAR", this.props.videoId);
	},

	_onChange: function () {
		this.setState({videoIndex: PopularIndexStore.all()});
	},

	_showMoreVideos: function () {
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(++this.page, "POPULAR", this.props.videoId);
	},

	render: function() {
		var sliders = [];

		// convert object to an array
		$.each(this.state.videoIndex, function(page, videoPage) {
			sliders.push(
				<VideosSlider key={page} page={videoPage} />
			);
		});

		return <div className="popular-index-sliders">{sliders}</div>;
	}
});

module.exports = PopularIndex;
