var React = require('react');
var Link = require('react-router').Link;

var SearchIndexStore = require('../../stores/search_page/search_index_store');
var ApiUtils = require('../../utils/api_utils');

var OtherConstants = require('../../constants/other_constants');

var SearchIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: SearchIndexStore.all(), currPage: 1};
	},

	componentDidMount: function () {
		this.storeToken = SearchIndexStore.addListener(this._onChange);

		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(this.state.currPage, "SEARCH", {
			searchString: this.props.searchString,
			videoId: -1
		});
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({currPage: 1});
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "SEARCH", {
			searchString: newProps.searchString,
			videoId: -1
		});
	},

	_onChange: function () {
		this.setState({videoIndex: SearchIndexStore.all()});
	},

	_changePage: function (newPage) {
		this.setState({currPage: newPage});
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(newPage, "SEARCH", {
			searchString: this.props.searchString,
			videoId: -1
		});
		window.scrollTo(0, 0);
	},

	createButtons: function () {
		var currPage = this.state.currPage;
		var BUTTON_LIMIT = 7;
		var totalResults = SearchIndexStore.totalSize();
		var totalPages = Math.ceil(totalResults / OtherConstants.PER_PAGE);

		var buttons = [];

		var startPage = Math.max(1, currPage - 3);

		for(var i = 0; i < BUTTON_LIMIT && (i + startPage) <= totalPages; i++) {
			var buttonClass = "search-index-button";

			// add special class to current page button
			if(currPage === i + startPage) {
				buttonClass += " selected";
			}

			buttons[i] = (
				<button key={i} onClick={this._changePage.bind(this, i + startPage)} className={buttonClass}>
					{i + startPage}
				</button>
			);
		}

		// check for need previous button
		if(currPage > 1) {
			buttons.unshift(
				<button key={-1} onClick={this._changePage.bind(this, currPage - 1)} className="search-index-prev">
					&lt;&lt; Previous
				</button>
			);
		}

		// check for need next button
		if(currPage < totalPages) {
			buttons.push(
				<button key={-2} onClick={this._changePage.bind(this, currPage + 1)} className="search-index-next">
					Next &gt;&gt;
				</button>
			);
		}

		return buttons;
	},

	render: function() {
		var page = this.state.videoIndex[this.state.currPage];
		var buttons = this.createButtons();

		if(page) {
			return (
				<div className="search-index group">
					<strong className="search-index-total">
						About {SearchIndexStore.totalSize()} results
					</strong>
					<ul className="search-index-results">{
						page.map(function (video) {
							return (
								<li key={video.id} className="search-index-result group">
									<Link to={'/videos/' + video.id} className="search-index-result-link">
										<img src={video.thumb}></img>
									</Link>
									<Link to={'/videos/' + video.id} className="search-index-result-title">
										<strong>{video.title}</strong>
									</Link>
									<strong className="search-index-result-username">{video.username}</strong>
									<strong className="search-index-result-date">{video.created_ago} ago</strong>
									<strong className="search-index-result-seperator">-</strong>
									<strong className="search-index-result-views">{video.total_views} views</strong>
									<strong className="search-index-result-description">{video.description}</strong>
								</li>
							);
						})
					}</ul>
					<div className="search-index-buttons group">
						{buttons}
					</div>
				</div>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = SearchIndex;
