var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var VideoPage = require('./components/video_page.jsx');

// for generic stuff rendered or configured on all pages
var CatTubeApp = React.createClass({

	render: function() {
		return (
			<header className='header'>
				<h2>CatTube</h2>
				<Link to='/videos/1'>To Video</Link>
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
			</Route>
		</Router>, $('#content')[0]);
});

module.exports = CatTubeApp;
