var React = require('react');

var ApiUtils = require('../../utils/api_utils');

var LoginPage = React.createClass({

	getInitialState: function () {
		return {username: "", password: ""};
	},

	render: function() {
		return (
			<div className='cattube-sign-in'>
        <h1>CatTube Sign In</h1>

        <form onSubmit={this.handleSubmit}>
          <label>Name
	          <input onChange={this.updateName} type="text" value={this.state.name}/>
					</label>

          <label>Password
	          <input onChange={this.updatePassword} type="password" value={this.state.password}/>
					</label>

          <input type='submit' value='Submit'/>
        </form>
      </div>
		);
	},

	updateName: function (e) {
		this.setState({ name: e.currentTarget.value });
	},

	updatePassword: function (e) {
		this.setState({ password: e.currentTarget.value });
	},

	handleValidations: function (e) {
		e.preventDefault();

		if(this.state.username.length < 1) {
			
		}
		else {

		}

		if(this.state.password.length < 6) {

		}
		else {

		}
	},

	handleSubmit: function (e) {



	}
});

module.exports = LoginPage;
