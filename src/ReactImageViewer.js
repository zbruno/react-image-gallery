import React, { Component, PropTypes } from 'react';

class ImageViewer extends Component {
  constructor() {
    super();

    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      window.addEventListener('keydown', this.handleKeyboardInput);
    } else {
      window.removeEventListener('keydown', this.handleKeyboardInput);
    }
  }

  gotoNext(event) {
    if (this.props.currentImages.length === 2) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickNext();
  }

  gotoPrevious(event) {
    if (this.props.currentImages.length === 2) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickPrev();
  }

  handleKeyboardInput(e) {
    switch (e.keyCode) {
      case 37:
        this.gotoPrevious(event);
        return true;
      case 39:
        this.gotoNext(event);
        return true;
      case 27:
        this.props.onClose();
        return true;
      default:
        return false;
    }
  }

  renderArrowPrev() {
    if (this.props.currentImages.length === 2) return null;

    return (
      <button className="image-viewer-icon-button prev-icon-button"
        title="Previous (Left arrow key)"
        type="button"
        onClick={this.gotoPrevious}
        onTouchEnd={this.gotoPrevious}>
        <svg className="image-viewer-icon left-icon" viewBox="0 0 100 100">
          <path d="M67.3,0.4l15,15L47.5,50.1l34.7,34.6l-15,15L17.7,50.1L67.3,0.4z"/>
        </svg>
      </button>
    );
  }

  renderArrowNext() {
    if (this.props.currentImages.length === 2) return null;

    return (
      <button className="image-viewer-icon-button next-icon-button"
        title="Next (Right arrow key)"
        type="button"
        onClick={this.gotoNext}
        onTouchEnd={this.gotoNext}>
        <svg className="image-viewer-icon right-icon" viewBox="0 0 100 100">
          <path d="M32.7,99.6l-15-15l34.7-34.7L17.7,15.3l15-15l49.6,49.6L32.7,99.6z"/>
        </svg>
      </button>
    );
  }

  renderCloseButton() {
    return (
      <button className="image-viewer-icon-button close-icon-button"
        title="Close (Esc)"
        onClick={this.props.onClose}
      >
        <svg className="image-viewer-icon close-icon" viewBox="0 0 100 100">
          <path d="M57.1,50l42.5,42.5l-7,7.1L50,57.1L7.5,99.6l-7.1-7.1L42.9,50L0.4,7.5l7.1-7.1L50,42.9L92.6,0.4l7,7.1L57.1,50z"/>
        </svg>
      </button>
    );
  }

  renderImages() {
    const { images, currentImages } = this.props;

    if (!images || !images.length) return null;

    return (currentImages.sort((a, b) => a - b).map((index) => {
      const counter = currentImages.length === 1 ? (<div className="image-viewer-footer-count">{index + 1} of {images.length}</div>) : null;

      return (
        <figure key={`image ${index}`} className="image-viewer-figure">
          <img className="image-viewer-image"
            alt={images[index].caption}
            key={index}
            onClick={this.handleImageClick}
            src={images[index].src}
          />
          <div className="image-viewer-footer">
            {counter}
            <figcaption className="image-viewer-footer-caption">{images[index].caption}</figcaption>
          </div>
        </figure>
      );
    }));
  }

  render() {
    const classNames = this.props.isOpen ? 'image-viewer-container opened' : 'image-viewer-container';

    return (
      <div className={classNames}>
        <div className="image-viewer-bg" onClick={this.props.onClose}></div>
        {this.renderCloseButton()}
        <div className="image-viewer-content">
          {this.renderImages()}
        </div>
        {this.renderArrowPrev()}
        {this.renderArrowNext()}
      </div>
    );
  }
}

ImageViewer.propTypes = {
  currentImages: PropTypes.array,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default ImageViewer;
