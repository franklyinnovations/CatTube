var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var SessionStore = require('../../stores/session_store');
var CommentsStore = require('../../stores/video_page/comments_store');

var AddComment = React.createClass({
	getInitialState: function () {
		return {
			hidden: true,
			body: '',
			errors: {body: '', status: ''}
		};
	},

	_unhideReply: function () {
		this.setState({hidden: false});
	},

	_hideReply: function () {
		this.setState({hidden: true});
	},

	_handleCommentValidations: function () {
		var errorsObj = {};
		var error_occurred = false;

		if(this.state.body.length === 0) {
			errorsObj.body = 'Comment too short!';
			error_occurred = true;
		}

		if(!SessionStore.isLoggedIn()) {
			errorsObj.status = 'Must be logged in to post comments!';
			error_occurred = true;
		}

		this.setState({errors: errorsObj});

		if(!error_occurred) {
			this._handleCommentSubmit();
		}
	},

	_handleCommentSubmit: function () {
		var comment = {
			body: this.state.body,
			parent_id: this.props.parentId
		};

		var onSuccess = function () {
			$('.reply-comment-textarea')[0].value = '';
			this.setState({body: '', hidden: true});

			// refresh all comment pages in store (since new one might be visible now)
			var pages = CommentsStore.pages();
			for(var i = 0; i < pages.length; i++) {
				ApiUtils.getCommentsByPageAndVideoId(pages[i], this.props.videoId);
			}
		};

		var onError = function (res) {
			var errorMessage = JSON.parse(res.responseText).message;

			this.setState({
				errors: {
					status: errorMessage
				}
			});
		};

		ApiUtils.createComment(this.props.videoId, comment, onSuccess.bind(this), onError.bind(this));
	},

	_updateText: function (e) {
		this.setState({body: e.currentTarget.value});
	},

	render: function () {
		var comment = this.props.comment;

		if(this.state.hidden) {
			return <button className='reply-comment-unhide' onClick={this._unhideReply}>Reply</button>;
		}
		else {
			return (
				<section className='reply-comment group'>
					<strong className='reply-comment-status'>{
						this.state.errors.status
					}</strong>
					<strong className='reply-comment-textarea-errors'>{
						this.state.errors.body
					}</strong>
					<button className='reply-comment-close' onClick={this._hideReply}>X</button>
					<textarea className='reply-comment-textarea' onChange={this._updateText}/>
					<button className='reply-comment-post' onClick={this._handleCommentValidations}>
						Post
					</button>
				</section>
			);
		}
	}

});

module.exports = AddComment;
