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
				error && error();
			}
		});
	},

	getCommentsByPageAndVideoId: function(page, videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'GET',
			data: {page: page},
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveComments(page, videoId, res);
				success && success();
			},
			error: function (res) {
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
				var message = JSON.parse(res.responseText).message
				error && error(message);
			},
		});
	},

	logoutUser: function(success, error) {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			dataType: 'json',
			success: function (res) {
				ApiActions.destroySession();
				success && success();
			},
			error: function (res) {
				error && error();
			},
		});
	},

	createUser: function(user, success, error) {
		$.ajax({
			url: '/api/users',
			method: 'POST',
			data: {user: user},
			dataType: 'json',
			success: function (res) {
				ApiUtils.getCurrentUser();
				success && success();
			},
			error: function (res) {
				error && error();
			},
		});
	},

	getVideoIndex: function(page, success, error) {
		$.ajax({
			url: '/api/videos',
			method: 'GET',
			data: {page: page},
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideoIndex(page, res);
				success && success();
			},
			error: function (res) {
				error && error();
			},
		});
	},

	createComment: function(videoId, comment, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'POST',
			data: {comment: comment},
			dataType: 'json',
			success: function (res) {
				success && success();
			},
			error: function (res) {
				error && error();
			},
		});
	},

	getUserById: function(userId, success, error) {
		$.ajax({
			url: '/api/users/' + userId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveUser(res);
				success && success();
			},
			error: function (res) {
				error && error();
			},
		});
	}
};

module.exports = ApiUtils;
