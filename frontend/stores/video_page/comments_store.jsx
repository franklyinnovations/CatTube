var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var CommentsStore = new Store(Dispatcher);

var _comments = {};
var _videoId = null;
var _totalSize = 0;
// var _totalLoaded = 0;

eCommentsStore = CommentsStore;

CommentsStore._countComments = function () {
	var size = 0;

	for(var p in _comments) {
		if(_comments.hasOwnProperty(p)) {
			var currPage = _comments[p];
			size += currPage.length;

			for(var i = 0; i < currPage.length; i++) {
				var currChildren = currPage[i].children;
				size += currChildren.length;
			}
		}
	}

	return size;
};

CommentsStore._appendComments = function (data) {
	_comments[data.page] = data.index.comments;
	// _totalLoaded += CommentsStore._countComments(data.index.comments);
	_totalSize = data.index.total_comments_size;
};

CommentsStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.COMMENTS_RECEIVED:
			// check if the comments should be reset to blank (if the videoId changed)
			if(_videoId !== payload.data.videoId) {
				_comments = {};
				// _totalLoaded = 0;
				_videoId = payload.data.videoId;
			}

			CommentsStore._appendComments(payload.data);
			CommentsStore.__emitChange();
			break;
		default:
			// console.log('CommentsStore#__onDispatch ignored a dispatch');
	}
};

CommentsStore.all = function () {
	return $.extend(true, {}, _comments);
};

CommentsStore.pages = function () {
	pages = [];
	for(var p in _comments) {
		if(_comments.hasOwnProperty(p)) {
			pages.push(p);
		}
	}
	return pages;
};

CommentsStore.fullyLoaded = function () {
	if(_totalSize === CommentsStore._countComments()) {
		return true;
	}
	else {
		return false;
	}
};

CommentsStore.totalSize = function () {
	return _totalSize;
};

CommentsStore.videoId = function () {
	return _videoId;
};

module.exports = CommentsStore;
