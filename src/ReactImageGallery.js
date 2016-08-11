import React, { Component, PropTypes } from 'react';
import ImageViewer from './ReactImageViewer';

class ImageGallery extends Component {
  constructor() {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImages: [],
      compareMode: false,
    };

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
    if (e.keyCode === 16 && !this.state.lightboxIsOpen) {
      this.setState({ compareMode: true });
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 16 && !this.state.lightboxIsOpen) {
      this.setState({ compareMode: false });

      if (this.state.currentImages.length !== 0) {
        this.openLightbox(this.state.currentImages);
      }
    }
  }

  openLightbox(index) {
    this.setState({
      currentImages: index,
      lightboxIsOpen: true,
      compareMode: false,
    });
  }

  closeLightbox() {
    this.setState({
      currentImages: [],
      lightboxIsOpen: false,
      compareMode: false,
    });
  }

  gotoPrevious() {
    if (this.state.currentImages.length === 1) {
      this.setState({
        currentImages: [this.state.currentImages[0] - 1],
      });
    }
  }

  gotoNext() {
    if (this.state.currentImages.length === 1) {
      this.setState({
        currentImages: [this.state.currentImages[0] + 1],
      });
    }
  }

  handleClickTrigger(i, e) {
    e.preventDefault();

    if (this.state.compareMode) {
      e.preventDefault();

      if (this.state.currentImages.indexOf(i) > -1) {
        this.state.currentImages.splice(this.state.currentImages.indexOf(i), 1);
      } else if (this.state.currentImages.length < 2) {
        this.state.currentImages.push(i);
      }

      this.setState({ currentImages: this.state.currentImages });
    } else {
      this.state.currentImages = [i];
      this.setState({ currentImages: this.state.currentImages });
      this.openLightbox(this.state.currentImages);
    }
  }

  renderImageGallery() {
    if (!this.props.images) return;
    const visibilityClass = !this.state.compareMode ? 'image-gallery' : 'image-gallery opened';

    const gallery = this.props.images.map((img, i) => {
      const imageContainerClassNames = this.state.currentImages.indexOf(i) > -1 ?
        'image-gallery-image-container active' : 'image-gallery-image-container';
      return (
        <div key={i}
          className={imageContainerClassNames}
          onClick={(e) => this.handleClickTrigger(i, e)}>
          <img className="image-gallery-image"
            src={img.thumbnail}
            alt={img.caption}
          />
          <span className="image-gallery-image-caption">{img.caption}</span>
        </div>
      );
    });

    return (
      <div className={visibilityClass}>
        <h2 className="image-gallery-heading">Choose Photos to Compare</h2>
        <p className="image-gallery-subheading">Click on photos to choose for comparison</p>
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
          currentImages={this.state.currentImages}
          images={this.props.images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClickImage={this.handleClickImage}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
};

export default ImageGallery;
