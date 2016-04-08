var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var CurrentUserLikeStore = new Store(Dispatcher);

var _current_user_like = null;

CurrentUserLikeStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.CURRENT_USER_LIKE_RECEIVED:
			_current_user_like = payload.data;
			CurrentUserLikeStore.__emitChange();
			break;
		default:
	}
};

CurrentUserLikeStore.all = function () {
	return $.extend(true, {}, _current_user_like);
};

module.exports = CurrentUserLikeStore;
