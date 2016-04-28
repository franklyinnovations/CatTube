var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var SearchStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

SearchStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

SearchStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

SearchStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "SEARCH") {
				SearchStore._appendVideos(payload.data);
				SearchStore.__emitChange();
			}
			break;
		default:
	}

};

SearchStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

SearchStore.fullyLoaded = function () {
	if(_totalSize === SearchStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

SearchStore.totalSize = function () {
	return _totalSize;
};

module.exports = SearchStore;
