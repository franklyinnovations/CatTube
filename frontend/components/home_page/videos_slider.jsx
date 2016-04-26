var React = require('react');
var Slider = require('react-slick');

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
							<div className="slider-element">
								<img key={video.id} src={video.thumb}></img>
								<strong className='slider-element-title'>{video.title}</strong>
								<strong className='slider-element-username'>{video.username}</strong>
								<strong className='slider-element-views'>{video.total_views} views</strong>
								<strong className='slider-element-date'>{video.created_at_date}</strong>
							</div>
						);
					})
				}</Slider>
			</div>
    );
  }
});

module.exports = VideosSlider;
