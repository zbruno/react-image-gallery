import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './ReactImageViewer';

class ImageGallery extends Component {
  constructor() {
    super();

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox() {
    this.props.lightboxOpen(true);
    this.props.changeCompareMode(false);
  }

  closeLightbox() {
    this.props.resetImages();
    this.props.lightboxOpen(false);
    this.props.changeCompareMode(false);
  }

  gotoPrevious() {
    this.props.displayPrev();
  }

  gotoNext() {
    this.props.displayNext();
  }

  handleClickTrigger(i, e) {
    e.preventDefault();

    return this.props.currentImages.indexOf(i) > -1 ? this.props.decrementSelectedImage(i) : this.props.incrementSelectedImage(i);
  }

  renderImageGallery() {
    if (!this.props.images) return;
    const visibilityClass = !this.props.compareMode ? 'image-gallery' : 'image-gallery opened';

    const gallery = this.props.images.map((img, i) => {
      const imageContainerClassNames = this.props.currentImages.indexOf(i) > -1 ?
        'image-gallery-image-container active' : 'image-gallery-image-container';
      return (
        <div key={i}
          className={imageContainerClassNames}
          onClick={(e) => this.handleClickTrigger(i, e)}>
          <img className="image-gallery-image"
            src={img.src}
            alt={img.caption}
          />
          <span className="image-gallery-image-caption">{img.caption}</span>
        </div>
      );
    });

    return (
      <div className={visibilityClass}>
        <div className="image-gallery-images-container">
          {gallery}
        </div>
      </div>
    );
  }

  render() {
    const {
      currentImages,
      images,
      lightboxIsOpen,
      onRequest,
      onProgress,
      progressStatus,
      requestStatus,
      patientId
    } = this.props;

    if (patientId === undefined ||
      progressStatus === undefined ||
      requestStatus === undefined) {
      return null;
    }

    return (
      <div className="image-gallery-container">
        {this.renderImageGallery()}
        <ImageViewer
          currentImages={currentImages}
          images={images}
          isOpen={lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onProgress={onProgress}
          onRequest={onRequest}
          progressStatus={progressStatus}
          requestStatus={requestStatus}
          patientId={patientId}
        />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  changeCompareMode: PropTypes.func.isRequired,
  compareMode: PropTypes.bool.isRequired,
  currentImages: PropTypes.array.isRequired,
  decrementSelectedImage: PropTypes.func.isRequired,
  displayNext: PropTypes.func.isRequired,
  displayPrev: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  incrementSelectedImage: PropTypes.func.isRequired,
  lightboxIsOpen: PropTypes.bool.isRequired,
  lightboxOpen: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
  patientId: PropTypes.number,
  progressStatus: PropTypes.bool,
  requestStatus: PropTypes.bool,
  resetImages: PropTypes.func.isRequired,
};

export default ImageGallery;
