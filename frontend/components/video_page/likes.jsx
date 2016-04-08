var React = require('react');

var LikesStore = require('../../stores/video_page/likes_store');
var CurrentUserLikeStore = require('../../stores/video_page/current_user_like_store');
var ApiUtils = require('../../utils/api_utils');

var Likes = React.createClass({

	getInitialState: function () {
		return {likes: {up: 0, down: 0}, current_like: null};
	},

	componentDidMount: function () {
		this.storeTokenLikesStore = LikesStore.addListener(this._onChangeLikesStore);
		ApiUtils.getLikesByVideoId(this.props.videoId);

		this.storeTokenCurrentUserLikeStore = CurrentUserLikeStore.addListener(this._onChangeCurrentUserLikeStore);
		ApiUtils.getCurrentUserLikeByVideoId(this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeTokenLikesStore.remove();
		this.storeTokenCurrentUserLikeStore.remove();
	},

	componentWillReceiveProps: function (newProps) {
		ApiUtils.getLikesByVideoId(newProps.videoId);
		ApiUtils.getCurrentUserLikeByVideoId(newProps.videoId);
	},

	_onChangeLikesStore: function () {
		this.setState({likes: LikesStore.all()});
	},

	_onChangeCurrentUserLikeStore: function () {
		this.setState({current_like: CurrentUserLikeStore.all()});
	},

	_likeUpVideo: function () {
		ApiUtils.createLike(this.props.videoId, 1, function () {
			ApiUtils.getLikesByVideoId(this.props.videoId);
			ApiUtils.getCurrentUserLikeByVideoId(this.props.videoId);
		}.bind(this));
	},

	_likeDownVideo: function () {
		ApiUtils.createLike(this.props.videoId, -1, function () {
			ApiUtils.getLikesByVideoId(this.props.videoId);
			ApiUtils.getCurrentUserLikeByVideoId(this.props.videoId);
		}.bind(this));
	},

	render: function() {
		var up = this.state.likes.up;
		var down = this.state.likes.down;
		var percent = up / (up + down);

		var current_like = this.state.current_like;
		var thumbsUpStyle = {};
		var thumbsDownStyle = {};

		// check for NaN (no votes)
		if(up + down === 0) {
			percent = 1;
		}

		if(current_like && current_like.value !== null) {
			if(current_like.value > 0) {
				thumbsUpStyle = {color: '#555555'};
			}
			else if(current_like.value < 0) {
				thumbsDownStyle = {color: '#555555'};
			}
		}

		return (
			<section className='likes'>
				<div className='likes-bar-total group'>
					<div style={{width: (percent * 100) + '%'}} className='likes-bar-fill'></div>
					<div style={{width: ((1 - percent) * 100) + '%'}} className='likes-bar-empty'></div>
				</div>
				<div className='likes-bar-updown group'>
					<div onClick={this._likeUpVideo} className='likes-up'>
						<i style={thumbsUpStyle} className="fa fa-thumbs-up"></i> {up}
					</div>
					<div onClick={this._likeDownVideo} className='likes-down'>
						<i style={thumbsDownStyle} className="fa fa-thumbs-down"></i> {down}
					</div>
				</div>
			</section>
		);
	}
});

module.exports = Likes;
