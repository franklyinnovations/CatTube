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
		var main = null;
		var others = [];

		// there should only be one featured video page
		if(this.state.videoIndex) {
			$.each(this.state.videoIndex, function(page, videoPage) {
				main = videoPage[0];
				others = videoPage.slice(1);
			});
		}

		if(main) {
			return (
				<div className="featured-index group">
					<div className="featured-main group">
						<Link to={'/videos/' + main.id} className="featured-main-link">
							<img src={main.thumb}></img>
						</Link>
						<Link to={'/videos/' + main.id} className="featured-main-title">
							<strong>{main.title}</strong>
						</Link>
						<strong className="featured-main-username">{main.username}</strong>
						<strong className="featured-main-views">{main.total_views} views</strong>
						<strong className="featured-main-seperator">-</strong>
						<strong className="featured-main-date">{main.created_ago} ago</strong>
					</div>
					<div className="featured-video-list group">{
						others.map(function (video) {
							return (
								<div key={video.id} className="featured-video group">
									<Link to={'/videos/' + video.id} className="featured-video-link">
										<img src={video.thumb}></img>
									</Link>
									<Link to={'/videos/' + video.id} className="featured-video-title">
										<strong>{video.title}</strong>
									</Link>
									<strong className="featured-video-username">{video.username}</strong>
									<strong className="featured-video-views">{video.total_views} views</strong>
									<strong className="featured-video-seperator">-</strong>
									<strong className="featured-video-date">{video.created_ago} ago</strong>
								</div>
							);
						})
					}</div>
				</div>
			);
		}
		else {
			return <div></div>;
		}
	}
});

module.exports = FeaturedIndex;
