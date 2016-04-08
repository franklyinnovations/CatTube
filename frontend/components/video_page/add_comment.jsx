var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var SessionStore = require('../../stores/session_store');
var CommentsStore = require('../../stores/video_page/comments_store');

var AddComment = React.createClass({
	getInitialState: function () {
		return {
			body: '',
			errors: {body: '', status: ''}
		};
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
			body: this.state.body
		};

		var onSuccess = function () {
			$('.add-comment-textarea')[0].value = '';
			this.setState({body: ''});

			// refresh all comment pages in store (since new one might be visible now)
			var pages = CommentsStore.pages();
			for(var i = 0; i < pages.length; i++) {
				ApiUtils.getCommentsByPageAndVideoId(pages[i], this.props.videoId);
			}
		};

		var onError = function () {
			this.setState({
				errors: {
					status: 'Couldn\'t post comment!'
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

		return (
			<section className='add-comment group'>
				<strong className='add-comment-status'>{
					this.state.errors.status
				}</strong>
				<strong className='add-comment-textarea-errors'>{
						this.state.errors.body
					}</strong>
				<textarea className='add-comment-textarea' onChange={this._updateText}/>
				<button className='add-comment-post' onClick={this._handleCommentValidations}>
					Post
				</button>
			</section>
		);
	}

});

module.exports = AddComment;
