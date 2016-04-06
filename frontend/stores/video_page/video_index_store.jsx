var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var VideoIndexStore = new Store(Dispatcher);

var _videoIndex = {};

VideoIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			_videoIndex[payload.data.page] = payload.data.index;
			VideoIndexStore.__emitChange();
			break;
		default:
	}

};

VideoIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

module.exports = VideoIndexStore;
