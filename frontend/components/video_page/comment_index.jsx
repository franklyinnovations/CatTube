var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var CommentsStore = require('../../stores/video_page/comments_store');

var Comment = require('./comment');
var AddComment = require('./add_comment');

var CommentIndex = React.createClass({

	getInitialState: function () {
		return {comments: null, page: 1};
	},

	componentDidMount: function () {
		this.storeToken = CommentsStore.addListener(this._onChange);
		ApiUtils.getCommentsByVideoId(1, this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({comments: CommentsStore.all()});
	},

	componentWillReceiveProps: function(newProps) {
		this.setState({comments: null, page: 1});
		ApiUtils.getCommentsByVideoId(1, newProps.videoId);
	},

	render: function() {
		if(this.state.comments) {
			var comments = this.state.comments;
			var output = [];

			// extract all comments out of the comment object
			for(var p in comments) {
				if(comments.hasOwnProperty(p)) {
					var currPage = comments[p];
					for(var i = 0; i < currPage.length; i++) {
						output.push(currPage[i]);
					}
				}
			}

			return (
				<section className='comment-index'>
					<strong className='comment-size'>{'Comments: ' + comments.size}</strong>
					<AddComment videoId={this.props.videoId}/> {
					output.map( function (comment) {
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
