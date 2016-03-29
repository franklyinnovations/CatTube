var ApiActions = require('../actions/api_actions.js');

var ApiUtils = {
	getVideoById: function(videoId) {
		$.ajax({
			url: '/api/videos/' + videoId,
			method: 'GET',
			dataType: 'json',
			success: function (res) {
				ApiActions.receiveVideo(res);
			},
			failure: function (res) {
				console.log('Error in ApiUtils#getVideoById with res: ' + res);
			}
		});
	},



};


module.exports = ApiUtils;
