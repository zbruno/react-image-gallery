import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div className="image-viewer-icon-button prev-icon-button"
        onClick={this.gotoPrevious}
        onTouchEnd={this.gotoPrevious}>
        <i className='image-viewer-icon material-icons'>navigate_before</i>
        <span className='image-viewer-icon-text'>Back</span>
      </div>
    );
  }

  renderArrowNext() {
    if (this.props.currentImages.length === 2) return null;

    return (
      <div className="image-viewer-icon-button next-icon-button"
        onClick={this.gotoNext}
        onTouchEnd={this.gotoNext}>
        <i className='image-viewer-icon material-icons'>navigate_next</i>
        <span className='image-viewer-icon-text'>Next</span>
      </div>
    );
  }

  renderCloseButton() {
    return (
      <div className="image-viewer-icon-button close-icon-button"
        onClick={this.props.onClose}
      >
        <i className='image-viewer-icon material-icons'>close</i>
        <span className='image-viewer-icon-text'>Close</span>
      </div>
    );
  }

  renderRequestButton() {
    const requestStatusClass = this.props.requestStatus ? 'active' : '';

    return (
      <div className={`image-viewer-icon-button request-icon-button ${requestStatusClass}`}
        onClick={() => this.props.onRequest(this.props.patientId)}
      >
        <i className='image-viewer-icon material-icons'>add_a_photo</i>
        <span className='image-viewer-icon-text'>Request</span>
      </div>
    );
  }

  renderProgressButton() {
    const progressStatusClass = this.props.progressStatus ? 'active' : '';

    return (
      <div className={`image-viewer-icon-button progress-icon-button ${progressStatusClass}`}
        onClick={() => this.props.onProgress(this.props.patientId)}
      >
        <i className='image-viewer-icon material-icons'>star</i>
        <span className='image-viewer-icon-text'>Progress</span>
      </div>
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
            onClick={this.gotoNext}
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
        <div className="image-viewer-bg" onClick={this.props.onClose} />
        <div className="image-viewer-actions">
          {this.renderProgressButton()}
          {this.renderRequestButton()}
          {this.renderCloseButton()}
        </div>
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
  currentImages: PropTypes.array.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  patientId: PropTypes.number.isRequired,
  progressStatus: PropTypes.bool.isRequired,
  requestStatus: PropTypes.bool.isRequired,
};

export default ImageViewer;
