var React = require('react');
var Link = require('react-router').Link;

var RecommendedIndexStore = require('../../stores/home_page/recommended_index_store');
var ApiUtils = require('../../utils/api_utils');

var VideosSlider = require('./videos_slider');

var RecommendedIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: RecommendedIndexStore.all()};
	},

	componentDidMount: function () {
		this.storeToken = RecommendedIndexStore.addListener(this._onChange);
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "RECOMMENDED", {videoId: this.props.videoId});
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({videoIndex: RecommendedIndexStore.all()});
	},

	render: function() {
		var recommendedPage = null;
		if(this.state.videoIndex) {
			recommendedPage = this.state.videoIndex[1];
		}

		return (
			<div className="recommended-index">
				<h2 className="recommended-index-title">Recommended</h2>
				<div className="recommended-index-slider">
					<VideosSlider page={recommendedPage} />
				</div>
			</div>
		);
	}
});

module.exports = RecommendedIndex;
