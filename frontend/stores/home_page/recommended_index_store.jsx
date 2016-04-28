var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var RecommendedIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

RecommendedIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

RecommendedIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

RecommendedIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "RECOMMENDED") {
				RecommendedIndexStore._appendVideos(payload.data);
				RecommendedIndexStore.__emitChange();
			}
			break;
		default:
	}

};

RecommendedIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

RecommendedIndexStore.fullyLoaded = function () {
	if(_totalSize === RecommendedIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

RecommendedIndexStore.totalSize = function () {
	return _totalSize;
};

module.exports = RecommendedIndexStore;
