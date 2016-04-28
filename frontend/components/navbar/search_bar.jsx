var React = require('react');

var SearchBar = React.createClass({
	_updateSearch: function () {

	},

	_submitSearch: function () {

	},

	render: function() {
		return (
			<div className="navbar-search-bar">
				<input onChange={this._updateSearch} className="navbar-search-input"/>
				<button onClick={this._submitSearch} className="navbar-search-button">
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
				<ul className="navbar-search-results">
				</ul>
			</div>
		);
	}

});

module.exports = SearchBar;
