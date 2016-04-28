var React = require('react');

var Icon = require('./icon');
var ReplyComment = require('./reply_comment');
var SessionStore = require('../../stores/session_store');
var ApiUtils = require('../../utils/api_utils');
var CommentsStore = require('../../stores/video_page/comments_store');

var Comment = React.createClass({

	_deleteComment: function () {

		function onSuccess () {
			var pages = CommentsStore.pages();
			var videoId = this.props.comment.video_id.toString();
			for(var i = 0; i < pages.length; i++) {
				ApiUtils.getCommentsByPageAndVideoId(pages[i], videoId);
			}
		}

		ApiUtils.deleteCommentById(this.props.comment.id, onSuccess.bind(this));
	},

	render: function() {
		var comment = this.props.comment;
		var replyComment;
		var deleteComment;

		if(this.props.comment.parent_id === null) {
			var videoId = comment.video_id.toString();
			replyComment = <ReplyComment parentId={comment.id} videoId={videoId}/>;
		}

		if(SessionStore.currentUser() && (this.props.comment.user_id === SessionStore.currentUser().id)) {
			deleteComment = (
				<button onClick={this._deleteComment} className='comment-delete'>
					Delete
				</button>
			);
		}

		return (
			<article className='comment'>
				<div className='comment-top'>
					<div className='comment-avatar group'>
						<Icon userId={comment.user_id}/>
					</div>
					<strong className='comment-username'>{comment.username}</strong>
					<strong className='comment-date'>{comment.created_ago} ago</strong>
					{deleteComment}
					<p className='comment-body'>{comment.body}</p>
					{replyComment}
				</div>

				{this.props.children}
			</article>
		);
	}

});

module.exports = Comment;
