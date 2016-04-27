var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
// var Link = require('react-router').Link;

var VideoPage = require('./components/video_page');
var UploadPage = require('./components/upload_page');
var NavBar = require('./components/navbar');
var SessionStore = require('./stores/session_store');
var LoginPage = require('./components/login_page');
var ApiUtils = require('./utils/api_utils');
var AccountPage = require('./components/account_page');
var HomePage = require('./components/home_page');

// for generic stuff rendered or configured on all pages
var CatTubeApp = React.createClass({

	render: function() {
		return (
			<header className='header'>
				<NavBar/>
				{this.props.children}
			</header>
		);
	}

});

$(function() {
	ReactDOM.render(
		<Router history={hashHistory} onUpdate={_scrollToTop}>
			<Route path='/' component={CatTubeApp}>
				<IndexRoute component={HomePage} onEnter={_getInitialFetch}/>
				<Route path='videos/:videoId' component={VideoPage}/>
				<Route path='upload' component={UploadPage} onEnter={_ensureLoggedIn}/>
				<Route path='login' component={LoginPage} onEnter={_ensureLoggedOut}/>
				<Route path='account' component={AccountPage} onEnter={_ensureLoggedOut}/>
			</Route>
		</Router>, $('#content')[0]);
});

function _scrollToTop () {
	window.scrollTo(0, 0);
}

function _getInitialFetch ( ) {
	ApiUtils.getCurrentUser();
}

function _ensureLoggedIn (nextState, replace, unblockCallback) {
	if(!SessionStore.initialFetch()) {
		ApiUtils.getCurrentUser(_redirectUnlessLoggedIn);
	}
	else {
		_redirectUnlessLoggedIn();
	}

	function _redirectUnlessLoggedIn () {
		if(!SessionStore.isLoggedIn()) {
			replace({pathname: '/login', query: {nextState: nextState.location.pathname}});
		}

		unblockCallback();
	}
}

function _ensureLoggedOut (nextState, replace, unblockCallback) {
	if(!SessionStore.initialFetch()) {
		ApiUtils.getCurrentUser(_redirectIfLoggedIn);
	}
	else {
		_redirectIfLoggedIn();
	}

	function _redirectIfLoggedIn () {
		if(SessionStore.isLoggedIn()) {
			replace({pathname: '/'});
		}

		unblockCallback();
	}
}

module.exports = CatTubeApp;
