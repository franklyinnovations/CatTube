var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var CommentsStore = new Store(Dispatcher);

var _comments = {};

CommentsStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.COMMENTS_RECEIVED:
			_comments[payload.data.page] = payload.data.index.comments;
			_comments.size = payload.data.index.comments_size;
			CommentsStore.__emitChange();
			break;
		default:
			// console.log('CommentsStore#__onDispatch ignored a dispatch');
	}

};

CommentsStore.all = function () {
	return $.extend(true, {}, _comments);
};

module.exports = CommentsStore;
