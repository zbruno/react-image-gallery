(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactImageGallery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _ReactImageViewer = require('./ReactImageViewer');

var _ReactImageViewer2 = _interopRequireDefault(_ReactImageViewer);

var ImageGallery = (function (_Component) {
  _inherits(ImageGallery, _Component);

  function ImageGallery() {
    _classCallCheck(this, ImageGallery);

    _get(Object.getPrototypeOf(ImageGallery.prototype), 'constructor', this).call(this);

    this.state = {
      lightboxIsOpen: false,
      currentImages: [],
      compareMode: false
    };

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
      if (e.keyCode === 16) {
        this.setState({ compareMode: true });
      }
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (e.keyCode === 16) {
        this.setState({ compareMode: false });

        if (this.state.currentImages.length !== 0) {
          this.openLightbox(this.state.currentImages);
        }
      }
    }
  }, {
    key: 'openLightbox',
    value: function openLightbox(index) {
      this.setState({
        currentImages: index,
        lightboxIsOpen: true,
        compareMode: false
      });
    }
  }, {
    key: 'closeLightbox',
    value: function closeLightbox() {
      this.setState({
        currentImages: [],
        lightboxIsOpen: false,
        compareMode: false
      });
    }
  }, {
    key: 'gotoPrevious',
    value: function gotoPrevious() {
      if (this.state.currentImages.length === 1) {
        this.setState({
          currentImages: [this.state.currentImages[0] - 1]
        });
      }
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext() {
      if (this.state.currentImages.length === 1) {
        this.setState({
          currentImages: [this.state.currentImages[0] + 1]
        });
      }
    }
  }, {
    key: 'handleClickTrigger',
    value: function handleClickTrigger(i, e) {
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
  }, {
    key: 'renderImageGallery',
    value: function renderImageGallery() {
      var _this = this;

      if (!this.props.images) return;

      var visibilityClass = !this.state.compareMode ? 'image-gallery' : 'image-gallery opened';
      var gallery = this.props.images.map(function (img, i) {
        var imageClassNames = _this.state.currentImages.indexOf(i) > -1 ? 'image-gallery-image active' : 'image-gallery-image';
        return _react2['default'].createElement(
          'div',
          { key: i, className: 'image-gallery-image-container' },
          _react2['default'].createElement('img', { className: imageClassNames,
            src: img.thumbnail,
            onClick: function (e) {
              return _this.handleClickTrigger(i, e);
            },
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
          'h2',
          { className: 'image-gallery-heading' },
          'Choose Photos to Compare'
        ),
        _react2['default'].createElement(
          'p',
          { className: 'image-gallery-subheading' },
          'Click on photos to choose for comparison'
        ),
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
          currentImages: this.state.currentImages,
          images: this.props.images,
          isOpen: this.state.lightboxIsOpen,
          onClickPrev: this.gotoPrevious,
          onClickNext: this.gotoNext,
          onClickImage: this.handleClickImage,
          onClose: this.closeLightbox
        })
      );
    }
  }]);

  return ImageGallery;
})(_react.Component);

ImageGallery.propTypes = {
  images: _react.PropTypes.array
};

exports['default'] = ImageGallery;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ReactImageViewer":2}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var ImageViewer = (function (_Component) {
  _inherits(ImageViewer, _Component);

  function ImageViewer() {
    _classCallCheck(this, ImageViewer);

    _get(Object.getPrototypeOf(ImageViewer.prototype), 'constructor', this).call(this);

    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  _createClass(ImageViewer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen) {
        window.addEventListener('keydown', this.handleKeyboardInput);
      } else {
        window.removeEventListener('keydown', this.handleKeyboardInput);
      }
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext(event) {
      if (this.props.currentImages.length === 2 || this.props.currentImages[0] === this.props.images.length - 1) return;
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.props.onClickNext();
    }
  }, {
    key: 'gotoPrevious',
    value: function gotoPrevious(event) {
      if (this.props.currentImages.length === 2 || this.props.currentImages[0] === 0) return;
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.props.onClickPrev();
    }
  }, {
    key: 'handleKeyboardInput',
    value: function handleKeyboardInput(e) {
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
  }, {
    key: 'renderArrowPrev',
    value: function renderArrowPrev() {
      if (this.props.currentImages.length === 2 || this.props.currentImages[0] === 0) return null;

      return _react2['default'].createElement(
        'button',
        { className: 'image-viewer-icon-button prev-icon-button',
          title: 'Previous (Left arrow key)',
          type: 'button',
          onClick: this.gotoPrevious,
          onTouchEnd: this.gotoPrevious },
        _react2['default'].createElement(
          'svg',
          { className: 'image-viewer-icon left-icon', viewBox: '0 0 100 100' },
          _react2['default'].createElement('path', { d: 'M67.3,0.4l15,15L47.5,50.1l34.7,34.6l-15,15L17.7,50.1L67.3,0.4z' })
        )
      );
    }
  }, {
    key: 'renderArrowNext',
    value: function renderArrowNext() {
      if (this.props.currentImages.length === 2 || this.props.currentImages[0] === this.props.images.length - 1) return null;

      return _react2['default'].createElement(
        'button',
        { className: 'image-viewer-icon-button next-icon-button',
          title: 'Next (Right arrow key)',
          type: 'button',
          onClick: this.gotoNext,
          onTouchEnd: this.gotoNext },
        _react2['default'].createElement(
          'svg',
          { className: 'image-viewer-icon right-icon', viewBox: '0 0 100 100' },
          _react2['default'].createElement('path', { d: 'M32.7,99.6l-15-15l34.7-34.7L17.7,15.3l15-15l49.6,49.6L32.7,99.6z' })
        )
      );
    }
  }, {
    key: 'renderCloseButton',
    value: function renderCloseButton() {
      return _react2['default'].createElement(
        'button',
        { className: 'image-viewer-icon-button close-icon-button',
          title: 'Close (Esc)',
          onClick: this.props.onClose
        },
        _react2['default'].createElement(
          'svg',
          { className: 'image-viewer-icon close-icon', viewBox: '0 0 100 100' },
          _react2['default'].createElement('path', { d: 'M57.1,50l42.5,42.5l-7,7.1L50,57.1L7.5,99.6l-7.1-7.1L42.9,50L0.4,7.5l7.1-7.1L50,42.9L92.6,0.4l7,7.1L57.1,50z' })
        )
      );
    }
  }, {
    key: 'renderImages',
    value: function renderImages() {
      var _this = this;

      var _props = this.props;
      var images = _props.images;
      var currentImages = _props.currentImages;

      if (!images || !images.length) return null;

      return currentImages.map(function (index) {
        var counter = currentImages.length === 1 ? _react2['default'].createElement(
          'div',
          { className: 'image-viewer-footer-count' },
          index + 1,
          ' of ',
          images.length
        ) : null;

        return _react2['default'].createElement(
          'figure',
          { key: 'image ' + index, className: 'image-viewer-figure' },
          _react2['default'].createElement('img', { className: 'image-viewer-image',
            alt: images[index].caption,
            key: index,
            onClick: _this.handleImageClick,
            src: images[index].src
          }),
          _react2['default'].createElement(
            'div',
            { className: 'image-viewer-footer' },
            counter,
            _react2['default'].createElement(
              'figcaption',
              { className: 'image-viewer-footer-caption' },
              images[index].caption
            )
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var classNames = this.props.isOpen ? 'image-viewer-container opened' : 'image-viewer-container';

      return _react2['default'].createElement(
        'div',
        { className: classNames },
        this.renderCloseButton(),
        _react2['default'].createElement(
          'div',
          { className: 'image-viewer-content' },
          this.renderImages()
        ),
        this.renderArrowPrev(),
        this.renderArrowNext()
      );
    }
  }]);

  return ImageViewer;
})(_react.Component);

ImageViewer.propTypes = {
  currentImages: _react.PropTypes.array,
  images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    src: _react.PropTypes.string.isRequired,
    caption: _react.PropTypes.string.isRequired
  })).isRequired,
  isOpen: _react.PropTypes.bool,
  onClickNext: _react.PropTypes.func,
  onClickPrev: _react.PropTypes.func,
  onClose: _react.PropTypes.func.isRequired
};

exports['default'] = ImageViewer;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});