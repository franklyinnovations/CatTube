var ApiConstants = require('../constants/api_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
	receiveVideo: function (video) {
		var payload = {
			actionType: ApiConstants.VIDEO_RECEIVED,
			data: video
		};

		Dispatcher.dispatch(payload);
	},

	receiveComments: function (comments) {
		var payload = {
			actionType: ApiConstants.COMMENTS_RECEIVED,
			data: comments
		};

		Dispatcher.dispatch(payload);
	},

	receiveLikes: function (likes) {
		var payload = {
			actionType: ApiConstants.LIKES_RECEIVED,
			data: likes
		};

		Dispatcher.dispatch(payload);
	},

	receiveSession: function (session) {
		var payload = {
			actionType: ApiConstants.SESSION_RECEIVED,
			data: session
		};

		Dispatcher.dispatch(payload);
	}
};

module.exports = ApiActions;
