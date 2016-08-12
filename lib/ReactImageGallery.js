'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactImageViewer = require('./ReactImageViewer');

var _ReactImageViewer2 = _interopRequireDefault(_ReactImageViewer);

var ImageGallery = (function (_Component) {
  _inherits(ImageGallery, _Component);

  function ImageGallery() {
    _classCallCheck(this, ImageGallery);

    _get(Object.getPrototypeOf(ImageGallery.prototype), 'constructor', this).call(this);

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  _createClass(ImageGallery, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (e.keyCode === this.props.keyCode && !this.props.lightboxIsOpen) {
        this.props.compareMode(true);
      }
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (e.keyCode === this.props.keyCode && !this.props.lightboxIsOpen) {
        this.props.compareMode(false);

        if (this.props.currentImages.length !== 0) {
          this.openLightbox();
        }
      }
    }
  }, {
    key: 'openLightbox',
    value: function openLightbox() {
      this.props.lightboxOpen(true);
      this.props.compareMode(false);
    }
  }, {
    key: 'closeLightbox',
    value: function closeLightbox() {
      this.props.resetImages();
      this.props.lightboxOpen(false);
      this.props.compareMode(false);
    }
  }, {
    key: 'gotoPrevious',
    value: function gotoPrevious() {
      this.props.displayPrev();
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext() {
      this.props.displayNext();
    }
  }, {
    key: 'handleClickTrigger',
    value: function handleClickTrigger(i, e) {
      e.preventDefault();

      return this.props.currentImages.indexOf(i) > -1 ? this.props.decrementSelectedImage(i) : this.props.incrementSelectedImage(i);
    }
  }, {
    key: 'renderImageGallery',
    value: function renderImageGallery() {
      var _this = this;

      if (!this.props.images) return;
      var visibilityClass = !this.props.compareMode ? 'image-gallery' : 'image-gallery opened';

      var gallery = this.props.images.map(function (img, i) {
        var imageContainerClassNames = _this.props.currentImages.indexOf(i) > -1 ? 'image-gallery-image-container active' : 'image-gallery-image-container';
        return _react2['default'].createElement(
          'div',
          { key: i,
            className: imageContainerClassNames,
            onClick: function (e) {
              return _this.handleClickTrigger(i, e);
            } },
          _react2['default'].createElement('img', { className: 'image-gallery-image',
            src: img.src,
            alt: img.caption
          }),
          _react2['default'].createElement(
            'span',
            { className: 'image-gallery-image-caption' },
            img.caption
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: visibilityClass },
        _react2['default'].createElement(
          'div',
          { className: 'image-gallery-images-container' },
          gallery
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'image-gallery-container' },
        this.renderImageGallery(),
        _react2['default'].createElement(_ReactImageViewer2['default'], {
          currentImages: this.props.currentImages,
          images: this.props.images,
          isOpen: this.props.lightboxIsOpen,
          onClickPrev: this.gotoPrevious,
          onClickNext: this.gotoNext,
          onClose: this.closeLightbox
        })
      );
    }
  }]);

  return ImageGallery;
})(_react.Component);

ImageGallery.propTypes = {
  compareMode: _react2['default'].PropTypes.bool,
  currentImages: _react2['default'].PropTypes.array,
  decrementSelectedImage: _react2['default'].PropTypes.func,
  displayNext: _react2['default'].PropTypes.func,
  displayPrev: _react2['default'].PropTypes.func,
  images: _react2['default'].PropTypes.array,
  incrementSelectedImage: _react2['default'].PropTypes.func,
  keyCode: _react2['default'].PropTypes.number,
  lightboxIsOpen: _react2['default'].PropTypes.bool,
  lightboxOpen: _react2['default'].PropTypes.func,
  resetImages: _react2['default'].PropTypes.func
};

exports['default'] = ImageGallery;
module.exports = exports['default'];