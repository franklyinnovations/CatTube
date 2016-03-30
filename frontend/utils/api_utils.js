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
};


module.exports = ApiUtils;
