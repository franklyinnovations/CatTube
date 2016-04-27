var React = require('react');
var Link = require('react-router').Link;

var FeaturedIndexStore = require('../../stores/home_page/featured_index_store');
var ApiUtils = require('../../utils/api_utils');

var FeaturedIndex = React.createClass({
	getInitialState: function () {
		return {videoIndex: FeaturedIndexStore.all()};
	},

	componentDidMount: function () {
		this.storeToken = FeaturedIndexStore.addListener(this._onChange);
		ApiUtils.getVideoIndexByPageAndTypeAndVideoId(1, "FEATURED", this.props.videoId);
	},

	componentWillUnmount: function () {
		this.storeToken.remove();
		// reset the list if the user goes elsewhere
		FeaturedIndexStore.reset();
	},

	_onChange: function () {
		this.setState({videoIndex: FeaturedIndexStore.all()});
	},

	render: function() {
		var featured = [];

		// there should only be one featured video page
		if(this.state.videoIndex) {
			$.each(this.state.videoIndex, function(page, videoPage) {
				featured = videoPage;
			});
		}

		return (
			<div className="featured-index">
				<h2 className="featured-index-title">Featured</h2>
				<div className="featured-video-list">{
					featured.map(function (video) {
						return (
							<div key={video.id}>
								<Link to={'/videos/' + video.id} className='featured-video-link'>
									<img src={video.thumb}></img>
									<strong className="featured-video-title">{video.title}</strong>
								</Link>
								<strong className="featured-video-username">{video.username}</strong>
								<strong className="featured-video-views">{video.total_views} views</strong>
								<strong className="featured-video-seperator">-</strong>
								<strong className="featured-video-date">{video.created_ago}</strong>
							</div>
						);
					})
				}</div>
			</div>
		);
	}
});

module.exports = FeaturedIndex;
