var ApiActions = require('../actions/api_actions.js');

var ApiUtils = {
	getVideoById: function (videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideo(res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			}
		});
	},

	getCommentsByPageAndVideoId: function (page, videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'GET',
			data: {page: page},
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveComments(page, videoId, res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			}
		});
	},

	getLikesByVideoId: function (videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/likes',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveLikes(res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			}
		});
	},

	uploadVideo: function (formData, success, error) {
		$.ajax({
			url: '/api/videos',
			method: 'POST',
			processData: false,
			contentType: false,
			dataType: 'json',
			data: formData,
			success: function (res) {
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			}
		});
	},

	getCurrentUser: function (completion) {
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

	loginUser: function (user, success, error) {
		$.ajax({
			url: '/api/session',
			method: 'POST',
			data: user,
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveSession(res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	logoutUser: function (success, error) {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			dataType: 'json',
			success: function (res) {
				ApiActions.destroySession();
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	createUser: function (formData, success, error) {
		$.ajax({
			url: '/api/users',
			method: 'POST',
			processData: false,
			contentType: false,
			dataType: 'json',
			data: formData,
			success: function (res) {
				ApiUtils.getCurrentUser();
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	getVideoIndexByPageAndTypeAndVideoId: function (page, type, videoId, success, error) {
		$.ajax({
			url: '/api/videos',
			method: 'GET',
			data: {page: page, type: type},
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideoIndex(page, videoId, res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	createComment: function (videoId, comment, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'POST',
			data: {comment: comment},
			dataType: 'json',
			success: function (res) {
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	getUserById: function (userId, success, error) {
		$.ajax({
			url: '/api/users/' + userId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveUser(res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	deleteCommentById: function (commentId, success, error) {
		$.ajax({
			url: '/api/comments/' + commentId,
			method: 'DELETE',
			dataType: 'json',
			success: function (res) {
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	getCurrentUserLikeByVideoId: function (videoId, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/like',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveCurrentUserLike(res);
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	createLike: function (videoId, likeValue, success, error) {
		$.ajax({
			url: '/api/videos/' + videoId + '/likes',
			method: 'POST',
			data: {like: {value: likeValue}},
			dataType: 'json',
			success: function (res) {
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	},

	deleteLikeById: function (likeId, success, error) {
		$.ajax({
			url: '/api/likes/' + likeId,
			method: 'DELETE',
			dataType: 'json',
			success: function (res) {
				success && success(res);
			},
			error: function (res) {
				error && error(res);
			},
		});
	}
};

module.exports = ApiUtils;
