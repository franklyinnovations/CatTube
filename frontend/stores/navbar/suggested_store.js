var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var SuggestedStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

SuggestedStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

SuggestedStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

SuggestedStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "SUGGESTED") {
				SuggestedStore._appendVideos(payload.data);
				SuggestedStore.__emitChange();
			}
			break;
		default:
	}

};

SuggestedStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

SuggestedStore.fullyLoaded = function () {
	if(_totalSize === SuggestedStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

SuggestedStore.totalSize = function () {
	return _totalSize;
};

module.exports = SuggestedStore;
