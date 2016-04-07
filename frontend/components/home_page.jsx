var React = require('react');
var Link = require('react-router').Link;

var HomePage = React.createClass({

	render: function() {
		return (
			<div>
				<Link to='/'>Home Page</Link><br/>
				<Link to='/videos/1'>First Video</Link><br/>
				<Link to='/upload'>Upload Page</Link><br/>
				<Link to='/login'>Login Page</Link><br/>
				<Link to='/account'>Account Page</Link>
			</div>
		);
	}

});

module.exports = HomePage;
