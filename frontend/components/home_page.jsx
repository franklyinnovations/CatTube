var React = require('react');
var ApiUtils = require('../utils/api_utils');

// var RecommendedIndex = require('./home_page/recommended_index');
var PopularIndex = require('./home_page/popular_index');

// var RecommendedIndexStore = require('../stores/home_page/recommended_index_store');
var PopularIndexStore = require('../stores/home_page/popular_index_store');

var Link = require('react-router').Link;

var HomePage = React.createClass({
	getInitialState: function () {
		return {
			// recVideos: RecommendedIndexStore.all(),
			popVideos: PopularIndexStore.all()
		};
	},

	componentDidMount: function () {
		this.popPage = 1;

		// this.recStoreToken = RecommendedIndexStore.addListener(function() {
		// 	this.setState({ recVideos: RecommendedIndexStore.all() });
		// }.bind(this));

		// this.popStoreToken = PopularIndexStore.addListener(function () {
		// 	this.setState({ popVideos: PopularIndexStore.all() });
		// }.bind(this));

		// ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "rec", -1);
		// ApiUtils.getVideoIndexByPageAndTypeAndVideoId(this.popPage, "pop", -1);
	},

	_handleLoadMore: function () {
		// ApiUtils.getVideoIndexByPageAndTypeAndVideoId(++this.popPage, "pop", 0);
	},

	render: function() {
		return (
			<div className="home-page-video-indexes">
				<div className="popular-index">{
					<PopularIndex />
				}</div>
				<button onClick={this._handleLoadMore}>Load more</button>
			</div>
		);
	}

});

module.exports = HomePage;
