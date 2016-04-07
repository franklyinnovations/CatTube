var React = require('react');

var LikesStore = require('../../stores/video_page/likes_store');
var ApiUtils = require('../../utils/api_utils');

var Likes = React.createClass({

	getInitialState: function () {
		return {likes: {up: 0, down: 0}};
	},

	componentDidMount: function () {
		this.storeToken = LikesStore.addListener(this._onChange);
		ApiUtils.getLikesByVideoId(this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({likes: LikesStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getLikesByVideoId(newProps.videoId);
	},

	render: function() {
		var up = this.state.likes.up;
		var down = this.state.likes.down;
		var percent = up / (up + down);

		// check for NaN (no votes)
		if(up + down === 0) {
			percent = 1;
		}

		return (
			<section className='likes'>
				<div className='likes-bar-total group'>
					<div style={{width: (percent * 100) + '%'}} className='likes-bar-fill'></div>
					<div style={{width: ((1 - percent) * 100) + '%'}} className='likes-bar-empty'></div>
				</div>
				<div className='likes-bar-updown group'>
					<div className='likes-up'>
						<i className="fa fa-thumbs-up"></i> {up}
					</div>
					<div className='likes-down'>
						<i className="fa fa-thumbs-down"></i> {down}
					</div>
				</div>
			</section>
		);
	}
});

module.exports = Likes;
