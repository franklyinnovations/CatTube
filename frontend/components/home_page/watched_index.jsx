var React = require('react');
var Link = require('react-router').Link;

var WatchedIndexStore = require('../../stores/home_page/watched_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideosSlider = require('./videos_slider');

var WatchedIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: WatchedIndexStore.all()};
	},

	componentDidMount: function () {
		this.storeToken = WatchedIndexStore.addListener(this._onChange);
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "WATCHED", this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
		// reset the list if the user goes elsewhere
		WatchedIndexStore.reset();
	},

	_onChange: function () {
		this.setState({videoIndex: WatchedIndexStore.all()});
	},

	render: function() {
		var watchedPage = null;
		if(this.state.videoIndex) {
			watchedPage = this.state.videoIndex[1];
		}

		return (
			<div className="watched-index">
				<h2 className="watched-index-title">Watched</h2>
				<div className="watched-index-slider">
					<VideosSlider page={watchedPage} />
				</div>
			</div>
		);
	}
});

module.exports = WatchedIndex;
