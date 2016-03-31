var ApiActions = require('../actions/api_actions.js');

var ApiUtils = {
	getVideoById: function(videoId, callback) {
		$.ajax({
			url: '/api/videos/' + videoId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideo(res);
				callback && callback();
			},
			failure: function (res) {
				console.log('Error in ApiUtils#getVideoById with res: ' + res);
			}
		});
	},

	getCommentsByVideoId: function(videoId, callback) {
		$.ajax({
			url: '/api/videos/' + videoId + '/comments',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveComments(res);
				callback && callback();
			},
			failure: function (res) {
				console.log('Error in ApiUtils#getCommentsByVideoId with res: ' + res);
			}
		});
	},

	getLikesByVideoId: function(videoId, callback) {
		$.ajax({
			url: '/api/videos/' + videoId + '/likes',
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveLikes(res);
				callback && callback();
			},
			failure: function (res) {
				console.log('Error in ApiUtils#getLikesByVideoId with res: ' + res);
			}
		});
	},

	uploadVideo: function(formData, callback) {
		$.ajax({
			url: '/api/videos',
			method: 'POST',
			processData: false,
			contentType: false,
			dataType: 'json',
			data: formData,
			success: function (res) {
				console.log('Video uploaded!');
				callback && callback();
			},
			failure: function (res) {
				console.log('Error in ApiUtils#uploadVideo with res: ' + res);
			}
		});
	}
};


module.exports = ApiUtils;
