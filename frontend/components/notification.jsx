var React = require('react');

var Notification = React.createClass({
	render: function() {
		return (
			<ul className='notification'> {
				this.props.notifications.map( function (notification) {
					return <li>notification</li>;
				})
			}</ul>
		);
	}
});

module.exports = Notification;
