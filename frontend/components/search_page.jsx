var React = require('react');
var ApiUtils = require('../utils/api_utils');

var SearchIndex = require('./search_page/search_index');

var SearchPage = React.createClass({
	getInitialState: function () {
		return {searchString: this.props.location.query.searchString};
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({searchString: newProps.location.query.searchString});
	},

	render: function() {
		return (
			<div className="search-page">
				<SearchIndex searchString={this.state.searchString} />
			</div>
		);
	}
});

module.exports = SearchPage;
