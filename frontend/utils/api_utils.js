var ApiActions = require('../actions/api_actions.js');

var ApiUtils = {
	getVideoById: function(videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideo(res);
				success && success();
			},
			error: function (res) {
				// console.log('Error in ApiUtils#getVideoById with res: ' + res);
				error && error();
			}
		});
	},

	getCommentsByVideoId: function(videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveComments(res);
				success && success();
			},
			error: function (res) {
				// console.log('Error in ApiUtils#getCommentsByVideoId with res: ' + res);
				error && error();
			}
		});
	},

	getLikesByVideoId: function(videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/likes',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveLikes(res);
				success && success();
			},
			error: function (res) {
				// console.log('Error in ApiUtils#getLikesByVideoId with res: ' + res);
				error && error();
			}
		});
	},

	uploadVideo: function(formData, success, error) {
		$.ajax({
			url: '/api/videos',
			method: 'POST',
			processData: false,
			contentType: false,
			dataType: 'json',
			data: formData,
			success: function (res) {
				success && success();
			},
			error: function (res) {
				// console.log('Error in ApiUtils#uploadVideo with res: ' + res);
				error && error();
			}
		});
	},

	getCurrentUser: function(completion) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveSession(res);
			},
			error: function (res) {
				// console.log('Error in ApiUtils#getCurrentUser with res: ' + res);
			},
			complete: function () {
				completion && completion();
			}
		});
	},

	loginUser: function(user, success, error) {
		$.ajax({
			url: '/api/session',
			method: 'POST',
			data: user,
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveSession(res);
				success && success();
			},
			error: function (res) {
				// console.log('Error in ApiUtils#loginUser with res: ' + res);
				var message = JSON.parse(res.responseText).message
				error && error(message);
			},
		});
	},
};


module.exports = ApiUtils;
