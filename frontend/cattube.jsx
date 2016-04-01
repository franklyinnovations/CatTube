var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var VideoPage = require('./components/video_page');
var UploadPage = require('./components/upload_page');
var NavBar = require('./components/navbar');
var SessionStore = require('./stores/session_store')

// for generic stuff rendered or configured on all pages
var CatTubeApp = React.createClass({

	render: function() {
		return (
			<header className='header'>
				<NavBar/>
				<Link to='/videos/1'>To First Video</Link>
				{this.props.children}
			</header>
		);
	}

});

$(function() {
	ReactDOM.render(
		<Router history={hashHistory}>
			<Route path='/' component={CatTubeApp}>
				<Route path='videos/:videoId' component={VideoPage}/>
				<Route path='upload' component={UploadPage} onEnter={_ensureLoggedIn}/>
				<Route path='login' component={LoginPage}/>
			</Route>
		</Router>, $('#content')[0]);
});

function _ensureLoggedIn (nextState, replace, unblockCallback) {
	if(!SessionStore.initialFetch()) {
		ApiUtils.getCurrentUser(_redirectUnlessLoggedIn);
	}
	else {
		_redirectUnlessLoggedIn();
	}

	function _redirectUnlessLoggedIn () {
		if(!SessionStore.isLoggedIn()) {
			replace('/login');
		}

		unblockCallback();
	}
}

module.exports = CatTubeApp;
