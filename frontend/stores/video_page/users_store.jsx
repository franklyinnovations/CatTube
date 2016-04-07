var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var UsersStore = new Store(Dispatcher);

var _users = {};

UsersStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.USER_RECEIVED:
			_users[payload.data.id] = payload.data;
			UsersStore.__emitChange();
			break;
		default:
	}

};

UsersStore.all = function () {
	return $.extend(true, {}, _users);
};

UsersStore.getById = function (id) {
	if(_users[id]) {
		return $.extend(true, {}, _users[id]);
	}
	else {
		return null;
	}
};

module.exports = UsersStore;
