var React = require('react');
var Link = require('react-router').Link;

var SessionStore = require('../stores/session_store');
var ApiUtils = require('../utils/api_utils');
var SearchBar = require('./navbar/search_bar');

var NavBar = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {currentUser: SessionStore.currentUser()};
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
		var userIcon;

		if(this.state.currentUser) {
			userIcon = (
				<button className='navbar-user' onClick={this._logoutCurrentUser}>
					Log Out: {this.state.currentUser.username}
				</button>
			);
		}
		else {
			userIcon = (
				<button className='navbar-user' onClick={this._loginNewUser}>
					Sign In
				</button>
			);
		}

		return (
			<header className='header'>
				<nav className='navbar'>
					<Link to='/' className='navbar-cattube-logo logo-cattube'>
						<h1 className='navbar-cat-logo logo-cat'>Cat</h1>
						<h1 className='navbar-tube-logo logo-tube'>Tube</h1>
					</Link>
					<SearchBar/>
					<div className='navbar-right group'>
						<Link className='navbar-upload' to='/upload'>Upload</Link>
						{userIcon}
					</div>
				</nav>
				<div className='header-block'></div>
			</header>
		);
	}

});

module.exports = NavBar;
