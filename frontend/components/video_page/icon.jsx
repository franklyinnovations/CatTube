var React = require('react');

var UsersStore = require('../../stores/video_page/users_store');
var ApiUtils = require('../../utils/api_utils');

var Icon = React.createClass({
	getInitialState: function () {
		return {user: UsersStore.getById(this.props.userId)};
	},

	componentDidMount: function () {
		this.storeToken = UsersStore.addListener(this._onChange);
		ApiUtils.getUserById(this.props.userId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({user: UsersStore.getById(this.props.userId)});
	},

	render: function() {
		var user = this.state.user;

		if(user) {
			return <img className='thumb-icon' src={user.thumb}></img>
		}
		else {
			return <div className='blank-icon'></div>
		}
	}

});

module.exports = Icon;
