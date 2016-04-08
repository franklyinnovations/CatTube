var React = require('react');

var ApiUtils = require('../../utils/api_utils');
var CommentsStore = require('../../stores/video_page/comments_store');

var Comment = require('./comment');
var AddComment = require('./add_comment');
var SubCommentIndex = require('./sub_comment_index');

var CommentIndex = React.createClass({

	getInitialState: function () {
		return {comments: null};
	},

	componentDidMount: function () {
		this.page = 1;
		this.storeToken = CommentsStore.addListener(this._onChange);
		ApiUtils.getCommentsByPageAndVideoId(1, this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
	},

	_onChange: function () {
		this.setState({comments: CommentsStore.all()});
	},

	_showMoreComments: function () {
		ApiUtils.getCommentsByPageAndVideoId(++this.page, this.props.videoId);
	},

	componentWillReceiveProps: function(newProps) {
		this.page = 1;
		this.setState({comments: null});
		ApiUtils.getCommentsByPageAndVideoId(1, newProps.videoId);
	},

	render: function() {
		if(this.state.comments) {
			var comments = this.state.comments;
			var totalSize = CommentsStore.totalSize();
			var output = [];
			var showMoreButton;

			// extract all comments out of the comment object
			for(var p in comments) {
				if(comments.hasOwnProperty(p)) {
					var currPage = comments[p];
					for(var i = 0; i < currPage.length; i++) {
						output.push(currPage[i]);
					}
				}
			}

			// render Show More button if not all comments are loaded
			if(!CommentsStore.fullyLoaded()) {
				showMoreButton = (
					<button onClick={this._showMoreComments} className='comment-index-more'>
						Show More
					</button>
				);
			}

			return (
				<section className='comment-index'>
					<strong className='comment-size'>{'Comments: ' + totalSize}</strong>
					<AddComment videoId={this.props.videoId}/>{
					output.map( function (comment) {
						return (
							<Comment key={comment.id} comment={comment}>{
								<SubCommentIndex subComments={comment.children}/>
							}</Comment>
						);
					})
				}{
					showMoreButton
				}</section>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = CommentIndex;
