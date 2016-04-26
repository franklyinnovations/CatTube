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

	render: function() {
		return (
			<div className="home-page-video-indexes">
				<PopularIndex />
			</div>
		);
	}

});

module.exports = HomePage;
