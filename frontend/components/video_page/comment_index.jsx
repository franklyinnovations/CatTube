var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var CommentsStore = require('../../stores/video_page/comments_store');

var Comment = require('./comment');

var CommentIndex = React.createClass({

	getInitialState: function () {
		return {comments: null};
	},

	componentDidMount: function () {
		this.storeToken = CommentsStore.addListener(this._onChange);
		ApiUtils.getCommentsByVideoId(this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({comments: CommentsStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		ApiUtils.getCommentsByVideoId(newProps.videoId);
	},

	render: function() {
		if(this.state.comments) {
			return (
				<section className='comment-index'> {

					this.state.comments.map( function (comment) {
						return (
							<Comment key={comment.id} comment={comment}> {
								comment.children.map( function (subComment) {
									return <Comment key={subComment.id} comment={subComment}/>;
								})
							}</Comment>
						);
					})

				}</section>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = CommentIndex;
