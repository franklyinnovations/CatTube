var React = require('react');

var ApiUtils = require('../utils/api_utils');

var LoginPage = React.createClass({
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
			<div className='cattube-sign-in'>
        <h1>CatTube Sign In</h1>

				<strong className='sign-in-status'>{this.state.errors.status}</strong>

        <form className='sign-in' onSubmit={this.handleValidations}>
          <label>Name
	          <input className='sign-in-username' onChange={this.updateName} type="text" value={this.state.username}/>
						<strong className='sign-in-username-errors'>{this.state.errors.username}</strong>
					</label>

          <label>Password
	          <input className='sign-in-password' onChange={this.updatePassword} type="password" value={this.state.password}/>
						<strong className='sign-in-password-errors'>{this.state.errors.password}</strong>
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
			var query = this.props.location.query;
			this.context.router.push({pathname: '/', query: query});
		};

		var onError = function () {
			this.setState({
				username: '',
				password: '',
				errors: {
					status: 'Error logging in with credentials!'
				}
			});
		};

		ApiUtils.loginUser({
			username: username,
			password: password
		}, onSuccess.bind(this), onError.bind(this));
	}
});

module.exports = LoginPage;
