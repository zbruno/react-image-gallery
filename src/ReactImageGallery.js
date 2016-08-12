import React, { Component, PropTypes } from 'react';
import ImageViewer from './ReactImageViewer';

class ImageGallery extends Component {
  constructor() {
    super();

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    if (e.keyCode === this.props.keyCode && !this.props.lightboxIsOpen) {
      this.props.compareMode(true);
    }
  }

  onKeyUp(e) {
    if (e.keyCode === this.props.keyCode && !this.props.lightboxIsOpen) {
      this.props.compareMode(false);

      if (this.props.currentImages.length !== 0) {
        this.openLightbox();
      }
    }
  }

  openLightbox() {
    this.props.lightboxOpen(true);
    this.props.compareMode(false);
  }

  closeLightbox() {
    this.props.resetImages();
    this.props.lightboxOpen(false);
    this.props.compareMode(false);
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
    return (
      <div className="image-gallery-container">
        {this.renderImageGallery()}
        <ImageViewer
          currentImages={this.props.currentImages}
          images={this.props.images}
          isOpen={this.props.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  compareMode: React.PropTypes.bool,
  currentImages: React.PropTypes.array,
  decrementSelectedImage: React.PropTypes.func,
  displayNext: React.PropTypes.func,
  displayPrev: React.PropTypes.func,
  images: React.PropTypes.array,
  incrementSelectedImage: React.PropTypes.func,
  keyCode: React.PropTypes.number,
  lightboxIsOpen: React.PropTypes.bool,
  lightboxOpen: React.PropTypes.func,
  resetImages: React.PropTypes.func,
};

export default ImageGallery;
