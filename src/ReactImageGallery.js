import React, { Component, PropTypes } from 'react';
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
      requestStatus
    } = this.props;

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
        />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  changeCompareMode: React.PropTypes.func.isRequired,
  compareMode: React.PropTypes.bool.isRequired,
  currentImages: React.PropTypes.array.isRequired,
  decrementSelectedImage: React.PropTypes.func.isRequired,
  displayNext: React.PropTypes.func.isRequired,
  displayPrev: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
  incrementSelectedImage: React.PropTypes.func.isRequired,
  lightboxIsOpen: React.PropTypes.bool.isRequired,
  lightboxOpen: React.PropTypes.func.isRequired,
  onProgress: React.PropTypes.func.isRequired,
  onRequest: React.PropTypes.func.isRequired,
  progressStatus: React.PropTypes.bool.isRequired,
  requestStatus: React.PropTypes.bool.isRequired,
  resetImages: React.PropTypes.func.isRequired,
};

export default ImageGallery;
