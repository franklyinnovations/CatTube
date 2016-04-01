var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var LikesStore = new Store(Dispatcher);

var _likes = null;

LikesStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.LIKES_RECEIVED:
			_likes = payload.data;
			LikesStore.__emitChange();
			break;
		default:
			console.log('LikesStore#__onDispatch ignored a dispatch');
	}

};

LikesStore.all = function () {
	return $.extend(true, {}, _likes);
};

module.exports = LikesStore;
