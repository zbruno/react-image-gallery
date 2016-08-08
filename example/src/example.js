var React = require('react');
var ReactDOM = require('react-dom');
var ReactImageGallery = require('react-image-gallery');

var App = React.createClass({
	render () {
    const IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
    const IMAGE_MAP = IMAGE_NAMES.map(img => ({
      src: `./images/800-${img}.jpg`,
      thumbnail: `./images/thumbnail-${img}.jpg`,
      caption: img,
    }));

		return (
			<div>
				<ReactImageGallery images={IMAGE_MAP} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
