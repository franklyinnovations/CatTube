var Dispatcher = require('../../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ApiConstants = require('../../constants/api_constants');

var VideoStore = new Store(Dispatcher);

var _video = null;

VideoStore.__onDispatch = function (payload) {
	switch(payload.actionType) {
		case ApiConstants.VIDEO_RECEIVED:
			_video = payload.data;
			VideoStore.__emitChange();
			break;
		default:
			console.log('VideoStore#__onDispatch ignored a dispatch');
	}

};

VideoStore.all = function () {
	return $.extend({}, _video);
};

module.exports = VideoStore;
