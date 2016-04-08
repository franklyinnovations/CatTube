var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var VideoIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

VideoIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

VideoIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

VideoIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(_videoId !== payload.data.videoId) {
				_videoIndex = {};
				_videoId = payload.data.videoId;
			}

			VideoIndexStore._appendVideos(payload.data);
			VideoIndexStore.__emitChange();
			break;
		default:
	}

};

VideoIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

VideoIndexStore.fullyLoaded = function () {
	if(_totalSize === VideoIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

VideoIndexStore.totalSize = function () {
	return _totalSize;
};

module.exports = VideoIndexStore;
