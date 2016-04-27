var React = require('react');
var ApiUtils = require('../utils/api_utils');

var RecommendedIndex = require('./home_page/recommended_index');
var PopularIndex = require('./home_page/popular_index');

var RecommendedIndexStore = require('../stores/home_page/recommended_index_store');
var PopularIndexStore = require('../stores/home_page/popular_index_store');

var SessionStore = require('../stores/session_store');

var Link = require('react-router').Link;

var HomePage = React.createClass({
	getInitialState: function () {
		return {isLoggedIn: SessionStore.isLoggedIn()};
	},

	componentDidMount: function () {
		this.storeToken = SessionStore.addListener(this._onChange);
		ApiUtils.getCurrentUser();
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({isLoggedIn: SessionStore.isLoggedIn()});
	},

	render: function() {
		return (
			<div className="home-page-video-indexes">
				{this.state.isLoggedIn ? <RecommendedIndex /> : null}
				<PopularIndex />
			</div>
		);
	}
});

module.exports = HomePage;
