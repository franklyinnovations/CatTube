var React = require('react');
var Slider = require('react-slick');
var Link = require('react-router').Link

var VideosSlider = React.createClass({
  render: function () {
    var settings = {
			infinite: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 5,
			draggable: false
    };

    return (
			<div className="slider-container">
				<Slider {...settings}>{
					this.props.page.map(function (video) {
						return (
							<div className="slider-element" key={video.id}>
								<Link to={'/videos/' + video.id} className='slider-element-link' key={video.id}>
									<img src={video.thumb}></img>
									<strong className="slider-element-title">{video.title}</strong>
								</Link>
								<strong className="slider-element-username">{video.username}</strong>
								<strong className="slider-element-views">{video.total_views} views</strong>
								<strong className="slider-element-seperator">-</strong>
								<strong className="slider-element-date">{video.created_ago}</strong>
							</div>
						);
					})
				}</Slider>
			</div>
    );
  }
});

module.exports = VideosSlider;
