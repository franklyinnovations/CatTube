var React = require('react');
var Link = require('react-router').Link;

var SearchIndexStore = require('../../stores/search_page/search_index_store');
var ApiUtils = require('../../utils/api_utils');

var SearchIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: SearchIndexStore.all()};
	},

	componentDidMount: function () {
		this.currPage = 1;
		this.storeToken = SearchIndexStore.addListener(this._onChange);

		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(this.currPage, "SEARCH", {
			searchString: this.props.searchString,
			videoId: -1
		});
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	componentWillReceiveProps: function (newProps) {
		this.currPage = 1;
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(this.currPage, "SEARCH", {
			searchString: newProps.searchString,
			videoId: -1
		});
	},

	_onChange: function () {
		this.setState({videoIndex: SearchIndexStore.all()});
	},

	render: function() {
		var page = this.state.videoIndex[this.currPage];

		if(page) {
			return (
				<div className="search-index">
					<ul className="search-index-results">{
						page.map(function (video) {
							return (
								<li key={video.id} className="search-index-result">{video.title}</li>
							);
						})
					}</ul>
				</div>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = SearchIndex;
