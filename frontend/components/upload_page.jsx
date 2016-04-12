var React = require('react');

var ApiUtils = require('../utils/api_utils');
// var Notification = require('./notification');

var UploadPage = React.createClass({

	getInitialState: function () {
		return {
			data: null,
			title: "",
			description: "",
			errors: {title: "", description: "", data: "", status: ""}
		};
	},

	handleFileChange: function (e) {
		var file = e.currentTarget.files[0];

    this.setState({ data: file });
	},

	handleValidations: function (e) {
		e.preventDefault();

		var title = this.state.title;
		var description = this.state.description;
		var data = this.state.data;
		var errorsObj = {};
		var error_occurred = false;

		if(title.length === 0) {
			errorsObj.title = 'No title!';
			error_occurred = true;
		}

		if(description.length === 0) {
			errorsObj.description = 'No description!';
			error_occurred = true;
		}

		if(!data) {
			errorsObj.data = 'No video file!';
			error_occurred = true;
		}

		this.setState({errors: errorsObj});

		if(!error_occurred) {
			this.handleSubmit();
		}
	},

	handleSubmit: function () {
		var formData = new FormData();

		var title = this.state.title;
		var description = this.state.description;

		formData.append('video[title]', title);
		formData.append('video[description]', description);
		formData.append('video[data]', this.state.data);

		var onSuccess = function () {
			// clear the file
			$('.upload-page-video')[0].value = '';

			this.setState({
				title: '',
				description: '',
				data: null,
				errors: {
					status: 'Video uploaded!'
				}
			});

			$('.upload-page-submit').prop('disabled', false);
		};

		var onError = function (res) {
			var errorMessage = JSON.parse(res.responseText).message;

			this.setState({
				errors: {
					status: errorMessage
				}
			});

			$('.upload-page-submit').prop('disabled', false);
		};

		$('.upload-page-submit').prop('disabled', true);
		ApiUtils.uploadVideo(formData, onSuccess.bind(this), onError.bind(this));
	},

	updateTitle: function (e) {
		this.setState({title: e.currentTarget.value});
	},

	updateDescription: function(e) {
		this.setState({description: e.currentTarget.value});
	},

	render: function() {
		return (
			<form className='upload-page' onSubmit={this.handleValidations}>
				<h1 className='upload-page-text'>Upload your video</h1>

				<strong className='upload-page-status'>{this.state.errors.status}</strong>

				<div className='upload-page-video-element'>
					<strong className='upload-page-file-errors'>{
							this.state.errors.data
						}</strong>
					<input type="file" className='upload-page-video' onChange={this.handleFileChange}/>
				</div>

				<label className='upload-page-title-label'>Title
					<strong className='upload-page-title-errors'>{
							this.state.errors.title
						}</strong>
          <input type="text" className='upload-page-title' onChange={this.updateTitle} value={this.state.title}/>
        </label>

				<label className='upload-page-description-label'>Description
					<strong className='upload-page-description-errors'>{
							this.state.errors.description
						}</strong>
					<textarea className='upload-page-description' onChange={this.updateDescription} value={this.state.description}/>
        </label>

				<input type="submit" value="Upload Video" className='upload-page-submit'/>
			</form>
		);
	}

});

module.exports = UploadPage;
