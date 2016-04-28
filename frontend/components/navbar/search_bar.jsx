var ApiUtils = require('../../utils/api_utils');
var SearchStore = require('../../stores/navbar/search_store');

var React = require('react');
var Link = require('react-router').Link;

var SearchBar = React.createClass({
	getInitialState: function () {
		return {searchResults: SearchStore.all()};
	},

	componentDidMount: function () {
		this.storeToken = SearchStore.addListener(this._onChange);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({searchResults: SearchStore.all()});
	},

	_updateSearch: function () {
		var currInput = $(".navbar-search-input").val();
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "SEARCH", {searchString: currInput, videoId: -1});
	},

	_submitSearch: function () {

	},

	render: function() {
		var results = [];
		var style = {};

		// there should be only one page in searchResults
		$.each(this.state.searchResults, function(page, videoPage) {
			results = videoPage;
		});

		if(results.length === 0) {
			style = {display: "none"};
		}

		return (
			<div className="navbar-search-bar">
				<input onChange={this._updateSearch} className="navbar-search-input"/>
				<button onClick={this._submitSearch} className="navbar-search-button">
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
				<ul className="navbar-search-results" style={style}>{
					results.map(function (video) {
						return (
							<Link className="navbar-search-result" key={video.id} to=''>
								<strong>{video.title}</strong>
							</Link>
						);
					})
				}</ul>
			</div>
		);
	}

});

module.exports = SearchBar;
