var React = require('react');

var SessionStore = require('../stores/session_store');
var ApiUtils = require('../utils/api_utils');

var NavBar = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {currentUser: SessionStore.currentUser()}
	},

	_onChange: function () {
		this.setState({currentUser: SessionStore.currentUser()});
	},

	_logoutCurrentUser: function () {
		ApiUtils.logoutUser();
		this.context.router.push({pathname: '/'});
	},

	_loginNewUser: function () {
		this.context.router.push({pathname: '/login'});
	},

	componentDidMount: function () {
		this.storeToken = SessionStore.addListener(this._onChange);
		ApiUtils.getCurrentUser();
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	render: function () {
		var icon;

		if(this.state.currentUser) {
			icon = (
				<button onClick={this._logoutCurrentUser}>
					Log Out: {this.state.currentUser.username}
				</button>
			);
		}
		else {
			icon = (
				<button onClick={this._loginNewUser}>
					Log In
				</button>
			);
		}

		return (
			<header className='header'>
				<h2>CatTube</h2>
				{icon}
			</header>
		);
	}

});

module.exports = NavBar;
