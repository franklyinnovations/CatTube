var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var FeaturedIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

FeaturedIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

FeaturedIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

FeaturedIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "FEATURED") {
				FeaturedIndexStore._appendVideos(payload.data);
				FeaturedIndexStore.__emitChange();
			}
			break;
		default:
	}

};

FeaturedIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

FeaturedIndexStore.fullyLoaded = function () {
	if(_totalSize === FeaturedIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

FeaturedIndexStore.totalSize = function () {
	return _totalSize;
};

module.exports = FeaturedIndexStore;
