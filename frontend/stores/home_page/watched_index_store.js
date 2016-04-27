var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var WatchedIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

WatchedIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

WatchedIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

WatchedIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "WATCHED") {
				WatchedIndexStore._appendVideos(payload.data);
				WatchedIndexStore.__emitChange();
			}
			break;
		default:
	}

};

WatchedIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

WatchedIndexStore.fullyLoaded = function () {
	if(_totalSize === WatchedIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

WatchedIndexStore.totalSize = function () {
	return _totalSize;
};

module.exports = WatchedIndexStore;
