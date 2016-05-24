var React = require('react');

// var ApiUtils = require('../../utils/api_utils');

var Comment = require('./comment');
var SubCommentIndex = React.createClass({

	getInitialState: function () {
		if(this.props.subComments.length > 1) {
			return {hidden: true};
		}
		else {
			return {hidden: false};
		}
	},

	_unhideSubComments: function () {
		this.setState({hidden: false});
	},

	_hideSubComments: function () {
		this.setState({hidden: true});
	},

	componentDidUpdate: function () {
		// change the video-page height if necessary (for footer position purposes)
		this.props.updateParentHeight();
	},

	render: function() {
		var subComments = this.props.subComments;
		var length = subComments.length;
		var hideCommentsButton;

		if(this.props.subComments.length > 1) {
			hideCommentsButton = (
				<button className='sub-comments-hide' onClick={this._hideSubComments}>
					Hide replies
				</button>
			);
		}

		if(this.state.hidden) {
			return (
				<div className='sub-comments'>
					<button className='sub-comments-unhide' onClick={this._unhideSubComments}>
						View all {length} replies
					</button>
					<Comment comment={subComments[length - 1]}/>
				</div>
			);
		}
		else {
			return (
				<div className='sub-comments'>
					{hideCommentsButton} {
					subComments.map( function (subComment) {
						return <Comment key={subComment.id} comment={subComment}/>;
					})
				}</div>
			);
		}
	}
});

module.exports = SubCommentIndex;
