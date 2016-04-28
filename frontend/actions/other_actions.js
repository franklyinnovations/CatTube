var ApiConstants = require('../constants/api_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var OtherActions = {
	// used for clearing video stores with only one page (like SearchStore)
	resetVideoIndexByPageAndTypeAndVideoId: function (page, type, videoId) {
		var index = {
			videos: [],
			total_videos_size: 0
		};

		var payload = {
			actionType: ApiConstants.VIDEO_INDEX_RECEIVED,
			data: {
				page: page,
				type: type,
				videoId: videoId,
				index: index
			}
		};

		Dispatcher.dispatch(payload);
	}
};

module.exports = OtherActions;
