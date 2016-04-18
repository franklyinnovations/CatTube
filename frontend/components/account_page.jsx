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
			verify: "",
			data: null,
			avatar: null,
			errors: {username: "", password: "", status: ""}
		};
	},

	handleFileChange: function (e) {
		var file = e.currentTarget.files[0];
		if(file) {
			var fr = new FileReader();

			fr.onload = function () {
				this.setState({ avatar: fr.result });
			}.bind(this);

			fr.readAsDataURL(file);
			this.setState({ data: file });
		}
		else {
			this.setState({ data: null, avatar: null });
		}
	},

	render: function() {
		return (
			<div className='new-account'>
				<div className='new-account-cattube-logo logo-cattube group'>
					<h1 className='new-account-cat-logo logo-cat'>Cat</h1>
					<h1 className='new-account-tube-logo logo-tube'>Tube</h1>
				</div>
        <h1 className='new-account-text'>Please create your new account</h1>

        <form className='new-account-form' onSubmit={this.handleValidations}>
					<strong className='new-account-status'>{this.state.errors.status}</strong>

          <label className='new-account-username-label'>New Username
						<strong className='new-account-username-errors'>{this.state.errors.username}</strong>
	          <input className='new-account-username' onChange={this.updateName} type="text" value={this.state.username}/>
					</label>

          <label className='new-account-password-label'>New Password
						<strong className='new-account-password-errors'>{this.state.errors.password}</strong>
	          <input className='new-account-password' onChange={this.updatePassword} type="password" value={this.state.password}/>
					</label>

					<label className='new-account-verify-label'>Verify Password
						<input className='new-account-verify' onChange={this.updateVerify} type="password" value={this.state.verify}/>
					</label>

					<label className='new-account-avatar-label group'>Custom Avatar
						<div className='new-account-avatar-element'>
							<img className='new-account-avatar-icon' src={this.state.avatar}/>
							<input className='new-account-avatar' type='file' accept="image/*" onChange={this.handleFileChange}/>
						</div>
					</label>

          <input className='new-account-submit' type='submit' value='Create Account'/>
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

	updateVerify: function (e) {
		this.setState({ verify: e.currentTarget.value });
	},

	handleValidations: function (e) {
		e.preventDefault();

		var username = this.state.username;
		var password = this.state.password;
		var verify = this.state.verify;

		var errorsObj = {};
		var error_occurred = false;

		if(username.length === 0) {
			errorsObj.username = 'Username too short!';
			error_occurred = true;
		}

		if(password !== verify) {
			errorsObj.password = 'Password fields don\'t match!';
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
		var data = this.state.data;

		var formData = new FormData();

		formData.append('user[username]', username);
		formData.append('user[password]', password);

		// avatar is optional
		if(data) {
			formData.append('user[avatar]', data);
		}

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

		ApiUtils.createUser(formData, onSuccess.bind(this), onError.bind(this));
	}
});

module.exports = AccountPage;
