var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var PopularIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

PopularIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

PopularIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

PopularIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "POPULAR") {
				PopularIndexStore._appendVideos(payload.data);
				PopularIndexStore.__emitChange();
			}
			break;
		default:
	}

};

PopularIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

PopularIndexStore.fullyLoaded = function () {
	if(_totalSize === PopularIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

PopularIndexStore.totalSize = function () {
	return _totalSize;
};

PopularIndexStore.reset = function () {
	_videoIndex = {};
	_totalSize = 0;
	_videoId = null;
};

module.exports = PopularIndexStore;
