var React = require('react');

var NotFoundPage = React.createClass({
	render: function () {
		return (
			<section className="not-found-page">
				<h1 className='not-found-page-404'>404</h1>
				<h1 className='not-found-page-message'>Cat Not Found!</h1>
				<i className="not-found-page-fa fa fa-frown-o" aria-hidden="true"></i>
			</section>
		);
	}
});

module.exports = NotFoundPage;
