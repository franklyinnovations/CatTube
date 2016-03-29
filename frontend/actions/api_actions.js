var ApiConstants = require('../constants/api_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
	receiveVideo: function (video) {
		var payload = {
			actionType: ApiConstants.VIDEO_RECEIVED,
			data: video
		};

		Dispatcher.dispatch(payload);
	}
};

module.exports = ApiActions;
