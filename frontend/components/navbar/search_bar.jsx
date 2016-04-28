var ApiUtils = require('../../utils/api_utils');
var SuggestedStore = require('../../stores/navbar/suggested_store');

var React = require('react');

// need access to the search bar from cattube.jsx
window.CatTube.SearchBarInstance = null;

var SearchBar = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {selected: null, hide: false, searchResults: SuggestedStore.all()};
	},

	componentDidMount: function () {
		window.CatTube.SearchBarInstance = this;
		this.storeToken = SuggestedStore.addListener(this._onChange);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({hide: false, searchResults: SuggestedStore.all()});
	},

	_updateSearch: function () {
		var currInput = $(".navbar-search-input").val();
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "SUGGESTED", {searchString: currInput, videoId: -1});
	},

	_upSelected: function() {
		var totalResults = 0;
		var selected;

		if(this.state.searchResults[1]) {
			totalResults = this.state.searchResults[1].length;
		}

		if(totalResults > 0) {
			if(this.state.selected === null) {
				selected = totalResults - 1;
			}
			else if(this.state.selected === 0) {
				selected = null;
			}
			else {
				selected = this.state.selected - 1;
			}

			this.setState({hide: false, selected: selected});
		}
	},

	_downSelected: function() {
		var totalResults = 0;
		var selected;

		if(this.state.searchResults[1]) {
			totalResults = this.state.searchResults[1].length;
		}

		if(totalResults > 0) {
			if(this.state.selected === null) {
				selected = 0;
			}
			else if(this.state.selected === totalResults - 1) {
				selected = null;
			}
			else {
				selected = this.state.selected + 1;
			}

			this.setState({hide: false, selected: selected});
		}
	},

	_mouseSelected: function (e) {
		var reactid = e.currentTarget.dataset.reactid;
		var target = parseInt(reactid.substring(reactid.length - 1));

		this.setState({hide: false, selected: target});
	},

	hideSuggestions: function () {
		this.setState({selected: null, hide: true});
	},

	_handleKeys: function (e) {
		switch(e.key) {
			case "Escape":
				e.preventDefault();
				this.hideSuggestions();
				break;
			case "ArrowDown":
				e.preventDefault();
				this._downSelected();
				break;
			case "ArrowUp":
				e.preventDefault();
				this._upSelected();
				break;
			case "Enter":
				e.preventDefault();
				this._submitSearch();
				break;
			default:
		}
	},

	_submitSearch: function () {
		if(this.state.selected !== null) {
			var searchResults = this.state.searchResults[1];
			$(".navbar-search-input").val(searchResults[this.state.selected].title);
		}

		var searchString = $(".navbar-search-input").val();
		this.context.router.push({
			pathname: "search",
			query: {searchString: searchString}
		});
	},

	render: function() {
		var results = [];
		var style = {};

		// there should be only one page in searchResults
		$.each(this.state.searchResults, function(page, videoPage) {
			results = videoPage;
		});

		if(this.state.hide || results.length === 0) {
			style = {display: "none"};
		}

		return (
			<div className="navbar-search-bar">
				<div className="navbar-search-form group">
					<input onKeyDown={this._handleKeys} onChange={this._updateSearch} className="navbar-search-input"/>
					<button onClick={this._submitSearch} className="navbar-search-button">
						<i className="fa fa-search" aria-hidden="true"></i>
					</button>
				</div>
				<ul className="navbar-search-results" style={style}>{
					results.map(function (video, i) {
						var searchResultClass = "navbar-search-result";

						// mark the selected one with an additional class for CSS
						if(this.state.selected !== null && this.state.selected === i) {
							searchResultClass += " selected";
						}

						return (
							<strong onClick={this._submitSearch} onMouseMove={this._mouseSelected} className={searchResultClass} key={i}>
								{video.title}
							</strong>
						);
					}.bind(this))
				}</ul>
			</div>
		);
	}

});

module.exports = SearchBar;
