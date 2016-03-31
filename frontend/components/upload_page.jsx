var React = require('react');

var ApiUtils = require('../utils/api_utils');
// var Notification = require('./notification');

var UploadPage = React.createClass({

	getInitialState: function () {
		return {data: null, errors: {}};
	},

	handleFileChange: function (e) {
		var file = e.currentTarget.files[0];

    this.setState({ data: file });
	},

	handleValidations: function (e) {
		e.preventDefault();

		var title = $('.upload-page-title').val();
		var description = $('.upload-page-description').val();
		var data = this.state.data;
		var errorsObj = {};
		var error_occurred = false;

		if(title && title.length > 0) {
			delete errorsObj.title;
		}
		else {
			errorsObj.title = 'No title!';
			error_occurred = true;
		}

		if(description && description.length > 0) {
			delete errorsObj.description;
		}
		else {
			errorsObj.description = 'No description!';
			error_occurred = true;
		}

		if(data) {
			delete errorsObj.data;
		}
		else {
			errorsObj.data = 'No video file!';
			error_occurred = true;
		}

		if(!error_occurred) {
			this.handleSubmit();
		}
		else {
			this.setState({errors: errorsObj});
		}
	},

	handleSubmit: function () {
		console.log('handleSubmit called');
		// var formData = new FormData();
		//
		// var title = $('.upload-page-title').val();
		// var description = $('.upload-page-description').val();
		//
		// if(this.state.data && this.state.title && this.state.description) {
		// 	formData.append('video[title]', this.state.title);
		// 	formData.append('video[description]', this.state.description);
		// 	formData.append('video[data]', this.state.data);
		//
		// 	ApiUtils.uploadVideo(formData);
		// }
	},

	render: function() {
		return (
			<form className='upload-page' onSubmit={this.handleValidations}>
				<label>Title
          <input type="text" className='upload-page-title'/>
					<strong className='upload-page-title-errors'> {
						this.state.errors.title
					}</strong>
        </label>

				<label>Description
          <input type="text" className='upload-page-description'/>
					<strong className='upload-page-title-errors'> {
						this.state.errors.description
					}</strong>
        </label>

				<label>Video
          <input type="file" className='upload-page-video' onChange={this.handleFileChange}/>
					<strong className='upload-page-file-errors'> {
						this.state.errors.data
					}</strong>
        </label>

        <input type="submit" value="Upload Video" className='upload-page-submit'/>
			</form>
		);
	}

});

module.exports = UploadPage;
