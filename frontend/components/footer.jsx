var React = require('react');
var Link = require('react-router').Link;

var Footer = React.createClass({
	render: function () {
		return (
			<footer className='footer group'>
				<Link to='/' className='footer-cattube-logo logo-cattube'>
					<h1 className='footer-cat-logo logo-cat'>Cat</h1>
					<h1 className='footer-tube-logo logo-tube'>Tube</h1>
				</Link>
				<strong className='footer-credits'>© 2016 trashctor. All rights reserved.</strong>
				<div className='footer-right'>
					<a href="https://github.com/trashctor" className='footer-link-github'>trashctor's Github</a>
					<a href="https://github.com/trashctor/CatTube" className='footer-link-cattube'>CatTube Github</a>
				</div>
			</footer>
		);
	}

});

module.exports = Footer;
