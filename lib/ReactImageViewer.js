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
      if (this.props.currentImages.length === 2) return;
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.props.onClickNext();
    }
  }, {
    key: 'gotoPrevious',
    value: function gotoPrevious(event) {
      if (this.props.currentImages.length === 2) return;
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
      if (this.props.currentImages.length === 2) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'image-viewer-icon-button prev-icon-button',
          onClick: this.gotoPrevious,
          onTouchEnd: this.gotoPrevious },
        _react2['default'].createElement(
          'i',
          { className: 'image-viewer-icon prev-icon' },
          'navigate_prev'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'image-viewer-icon-text' },
          'Previous'
        )
      );
    }
  }, {
    key: 'renderArrowNext',
    value: function renderArrowNext() {
      if (this.props.currentImages.length === 2) return null;

      return _react2['default'].createElement(
        'div',
        { className: 'image-viewer-icon-button next-icon-button',
          onClick: this.gotoNext,
          onTouchEnd: this.gotoNext },
        _react2['default'].createElement(
          'i',
          { className: 'image-viewer-icon next-icon' },
          'navigate_next'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'image-viewer-icon-text' },
          'Next'
        )
      );
    }
  }, {
    key: 'renderCloseButton',
    value: function renderCloseButton() {
      return _react2['default'].createElement(
        'div',
        { className: 'image-viewer-icon-button close-icon-button',
          onClick: this.props.onClose
        },
        _react2['default'].createElement(
          'i',
          { className: 'image-viewer-icon close-icon' },
          'close'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'image-viewer-icon-text' },
          'Close'
        )
      );
    }
  }, {
    key: 'renderRequestButton',
    value: function renderRequestButton() {
      return _react2['default'].createElement(
        'div',
        { className: 'image-viewer-icon-button request-icon-button',
          onClick: this.props.onRequest
        },
        _react2['default'].createElement(
          'i',
          { className: 'image-viewer-icon material-icons' },
          'add_a_photo'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'image-viewer-icon-text' },
          'Request'
        )
      );
    }
  }, {
    key: 'renderProgressButton',
    value: function renderProgressButton() {
      return _react2['default'].createElement(
        'div',
        { className: 'image-viewer-icon-button progress-icon-button',
          onClick: this.props.onProgress
        },
        _react2['default'].createElement(
          'i',
          { className: 'image-viewer-icon material-icons' },
          'star'
        ),
        _react2['default'].createElement(
          'span',
          { className: 'image-viewer-icon-text' },
          'Progress'
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

      return currentImages.sort(function (a, b) {
        return a - b;
      }).map(function (index) {
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
            onClick: _this.gotoNext,
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
        _react2['default'].createElement('div', { className: 'image-viewer-bg', onClick: this.props.onClose }),
        _react2['default'].createElement(
          'div',
          { className: 'image-viewer-actions' },
          this.renderProgressButton(),
          this.renderRequestButton(),
          this.renderCloseButton()
        ),
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
  currentImages: _react.PropTypes.array.isRequired,
  images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    src: _react.PropTypes.string.isRequired,
    caption: _react.PropTypes.string.isRequired
  })).isRequired,
  isOpen: _react.PropTypes.bool.isRequired,
  onClickNext: _react.PropTypes.func.isRequired,
  onClickPrev: _react.PropTypes.func.isRequired,
  onClose: _react.PropTypes.func.isRequired,
  onProgress: _react.PropTypes.func.isRequired,
  onRequest: _react.PropTypes.func.isRequired
};

exports['default'] = ImageViewer;
module.exports = exports['default'];