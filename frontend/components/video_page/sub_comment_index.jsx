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

	render: function() {
		var subComments = this.props.subComments;
		var length = subComments.length;

		if(this.state.hidden) {
			return (
				<div className='sub-comments'>
					<Comment comment={subComments[length - 1]}/>
					<button className='sub-comments-unhide' onClick={this._unhideSubComments}>View all {length} replies</button>
				</div>
			);
		}
		else {
			return (
				<div className='sub-comments'>{
					subComments.map( function (subComment) {
						return <Comment key={subComment.id} comment={subComment}/>;
					})
				}</div>
			);
		}
	}
});

module.exports = SubCommentIndex;
