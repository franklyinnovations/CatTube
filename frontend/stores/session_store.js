var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../constants/api_constants');

var SessionStore = new Store(Dispatcher);

var _initialFetch = false;
var _currentUser = null;

SessionStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.SESSION_RECEIVED:
			_initialFetch = true;
			_currentUser = payload.data;
			SessionStore.__emitChange();
			break;
		case ApiConstants.SESSION_DESTROYED:
			_initialFetch = true;
			_currentUser = null;
			SessionStore.__emitChange();
			break;
		default:
			// console.log('SessionStore#__onDispatch ignored a dispatch');
	}
};

SessionStore.currentUser = function () {
	if(_currentUser) {
		return $.extend(true, {}, _currentUser);
	}
	else {
		return null;
	}
};

SessionStore.isLoggedIn = function () {
	return !!_currentUser;
};

SessionStore.initialFetch = function () {
	return _initialFetch;
};

module.exports = SessionStore;
