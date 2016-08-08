var React = require('react');
var ReactDOM = require('react-dom');
var ReactImageGallery = require('react-image-gallery');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactImageGallery />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
