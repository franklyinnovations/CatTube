var React = require('react');

var Video = React.createClass({

	render: function() {

		if(this.props.video) {
			return (
				<section className='video'>
					<video controls src={this.props.video.url} className='video-player'/>
				</section>
			);
		}
		else {
			return <div></div>;
		}
	}

});

module.exports = Video;
