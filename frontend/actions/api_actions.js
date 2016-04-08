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

	receiveComments: function (page, videoId, comments) {
		var payload = {
			actionType: ApiConstants.COMMENTS_RECEIVED,
			data: {
				page: page,
				videoId: videoId,
				index: comments
			}
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
	},

	destroySession: function () {
		var payload = {
			actionType: ApiConstants.SESSION_DESTROYED,
			data: null
		};

		Dispatcher.dispatch(payload);
	},

	receiveVideoIndex: function (page, index) {
		var payload = {
			actionType: ApiConstants.VIDEO_INDEX_RECEIVED,
			data: {
				page: page,
				index: index
			}
		};

		Dispatcher.dispatch(payload);
	},

	receiveUser: function (user) {
		var payload = {
			actionType: ApiConstants.USER_RECEIVED,
			data: user
		};

		Dispatcher.dispatch(payload);
	}
};

module.exports = ApiActions;
