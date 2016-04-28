var React = require('react');
var Slider = require('react-slick');
var Link = require('react-router').Link;

var VideosSlider = React.createClass({
  render: function () {
		if(this.props.page) {

	    var settings = {
				infinite: false,
				speed: 500,
				slidesToShow: 5,
				slidesToScroll: 5,
				draggable: false
	    };

			// console.log('---------------------------\n');
	    return (
				<div className="slider-container">
					<Slider {...settings}>{
						this.props.page.map(function (video) {
							// console.log(video.id);
							return (
								<div className="slider-element" key={video.id}>
									<Link to={'/videos/' + video.id} className='slider-element-link'>
										<img src={video.thumb}></img>
										<strong className="slider-element-title">{video.title}</strong>
									</Link>
									<strong className="slider-element-username">{video.username}</strong>
									<strong className="slider-element-views">{video.total_views} views</strong>
									<strong className="slider-element-seperator">-</strong>
									<strong className="slider-element-date">{video.created_ago} ago</strong>
								</div>
							);
						})
					}</Slider>
				</div>
	    );

		}
		else {
			return <div></div>;
		}
		// console.log('---------------------------\n');
  }
});

module.exports = VideosSlider;
