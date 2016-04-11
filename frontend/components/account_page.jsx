var React = require('react');

var ApiUtils = require('../utils/api_utils');

var AccountPage = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {
			username: "",
			password: "",
			errors: {username: "", password: "", status: ""}
		};
	},

	render: function() {
		return (
			<div className='cattube-new-account'>
        <h1>CatTube New Account</h1>

        <form className='new-account' onSubmit={this.handleValidations}>
					<strong className='new-account-status'>{this.state.errors.status}</strong>

          <label>Username
	          <input className='new-account-username' onChange={this.updateName} type="text" value={this.state.username}/>
						<strong className='new-account-username-errors'>{this.state.errors.username}</strong>
					</label>

          <label>Password
	          <input className='new-account-password' onChange={this.updatePassword} type="password" value={this.state.password}/>
						<strong className='new-account-password-errors'>{this.state.errors.password}</strong>
					</label>

          <input type='submit' value='Submit'/>
        </form>
      </div>
		);
	},

	updateName: function (e) {
		this.setState({ username: e.currentTarget.value });
	},

	updatePassword: function (e) {
		this.setState({ password: e.currentTarget.value });
	},

	handleValidations: function (e) {
		e.preventDefault();

		var username = this.state.username;
		var password = this.state.password;

		var errorsObj = {};
		var error_occurred = false;

		if(username.length === 0) {
			errorsObj.username = 'Username too short!';
			error_occurred = true;
		}

		if(password.length < 6) {
			errorsObj.password = 'Password too short!';
			error_occurred = true;
		}

		this.setState({errors: errorsObj});

		if(!error_occurred) {
			this.handleSubmit();
		}
	},

	handleSubmit: function () {
		var username = this.state.username;
		var password = this.state.password;

		var onSuccess = function () {
			var nextState = '/';
			this.context.router.push({pathname: nextState});
		};

		var onError = function (res) {
			var errorMessage = JSON.parse(res.responseText).message;

			this.setState({
				errors: {
					status: errorMessage
				}
			});
		};

		ApiUtils.createUser({
			username: username,
			password: password
		}, onSuccess.bind(this), onError.bind(this));
	}
});

module.exports = AccountPage;
