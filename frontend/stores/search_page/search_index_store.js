var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var SearchIndexStore = new Store(Dispatcher);

var _videoIndex = {};
var _totalSize = 0;
var _videoId = null;

SearchIndexStore._countVideos = function () {
	var size = 0;
	for(var p in _videoIndex) {
		if(_videoIndex.hasOwnProperty(p)) {
			size += _videoIndex[p].length;
		}
	}
	return size;
};

SearchIndexStore._appendVideos = function (data) {
	_videoIndex[data.page] = data.index.videos;
	_totalSize = data.index.total_videos_size;
};

SearchIndexStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_INDEX_RECEIVED:
			if(payload.data.type === "SEARCH") {
				SearchIndexStore._appendVideos(payload.data);
				SearchIndexStore.__emitChange();
			}
			break;
		default:
	}

};

SearchIndexStore.all = function () {
	return $.extend(true, {}, _videoIndex);
};

SearchIndexStore.fullyLoaded = function () {
	if(_totalSize === SearchIndexStore._countVideos()) {
		return true;
	}
	else {
		return false;
	}
};

SearchIndexStore.totalSize = function () {
	return _totalSize;
};

module.exports = SearchIndexStore;
