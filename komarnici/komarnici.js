'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ?
    call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass,
    superClass) : subClass.__proto__ = superClass;
}

var _React = React;
var Component = _React.Component;
var staticen =
  'Статичните комарници се 15 евра од квадрат. Се изработуваат од висококвалитетни алуминиумски рамки и мрежи изработени од стаклени влакна со покритие од тефлон. Не бараат скоро никаква грижа. Оваа цена е за бела рамка. Ако сакате во боја, цената е повисока.';
var vrata_komarnik =
  'Врата комарници се 25 евра од квадрат. Се изработуваат од висококвалитетни алуминиумски рамки и мрежи изработени од стаклени влакна со покритие од тефлон. Не бараат скоро никаква грижа. Оваа цена е за бела рамка. Ако сакате во боја, цената е повисока.';
var rolo =
  'Роло комарници се 30 евра од квадрат. Се изработуваат од висококвалитетни алуминиумски рамки и мрежи изработени од стаклени влакна со покритие од тефлон. Не бараат скоро никаква грижа. Оваа цена е за бела рамка. Ако сакате во боја, цената е повисока.';
var plise =
  'Плисе комарници се 45 евра од квадрат. Се изработуваат од висококвалитетни алуминиумски рамки и мрежи изработени од стаклени влакна со покритие од тефлон. Не бараат скоро никаква грижа. Оваа цена е за бела рамка. Ако сакате во боја, цената е повисока.';

var items = [{
  name: 'Статичен',
  text: staticen,
  image: 'staticen.jpg'
}, {
  name: 'Врата-комарник',
  text: vrata_komarnik,
  image: 'vrata_komarnik.jpg'
}, {
  name: 'Роло',
  text: rolo,
  image: 'rolo.jpg'
}, {
  name: 'Плисе',
  text: plise,
  image: 'plise.jpg'
}];

var Gallery = function(_Component) {
  _inherits(Gallery, _Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.items = items;
    _this.defaultCardPos = {
      top: '-200%',
      left: 0
    };
    _this.state = {
      activeItem: false,
      cardTop: _this.defaultCardPos.top,
      cardLeft: _this.defaultCardPos.left,
      cardActive: false
    };
    return _this;
  }

  Gallery.prototype.handleItemClick = function handleItemClick(name, item) {
    var _this2 = this;

    this.setState({
      activeItem: name
    });
    var oTop = item.offsetTop,
      oLeft = item.offsetLeft;
    this.setState({
      cardTop: oTop,
      cardLeft: oLeft
    });
    this.cardTimeout = setTimeout(function() {
      _this2.setState({
        cardActive: true
      });
    }, 100);
  };

  Gallery.prototype.getBackgroundImage = function getBackgroundImage(itemName) {
    var imageItem = this.items.reduce(function(ov, nv) {
      return nv.name == itemName ? nv : ov;
    });
    return imageItem.image;
  };

  Gallery.prototype.handleCardClick = function handleCardClick() {
    if (!this.state.activeItem) return false;
    this.setState({
      cardActive: false,
      activeItem: false,
      cardTop: this.defaultCardPos.top,
      cardLeft: this.defaultCardPos.left
    });
  };

  Gallery.prototype.renderGallery = function renderGallery() {
    var _this3 = this;

    return this.items.map(function(item) {
      var activeClass = _this3.state.cardActive ? 'active' : ''; //this.state.activeItem == item.name ? 'active' : '';
      return React.createElement(
        GalleryItem, {
          name: item.name,
          text: item.text,
          background: item.image,
          active: activeClass,
          clickFunction: _this3.handleItemClick.bind(_this3)
        },
        React.createElement(
          'h2',
          null,
          item.name
        ),
        React.createElement('div', {
          className: 'item-mask'
        })
      );
    });
  };

  Gallery.prototype.render = function render() {
    var maskActive = ''; //this.state.activeItem ? "active" : "";
    var galleryBackground = this.state.activeItem ? this.getBackgroundImage(
      this.state.activeItem) : '';
    return React.createElement(
      'div', {
        className: 'gallery'
      },
      this.renderGallery(),
      React.createElement(Card, {
        title: this.state.activeItem,
        text: this.state.activeItem.text,
        ref: 'card',
        top: this.state.cardTop,
        left: this.state.cardLeft,
        active: this.state.cardActive,
        closeFunction: this.handleCardClick.bind(this)
      }),
      React.createElement('div', {
        className: 'gallery-mask ' + maskActive
      }),
      React.createElement('div', {
        className: 'backdrop ' + (this.state.activeItem ? 'active' : ''),
        style: {
          'backgroundImage': 'url(' + galleryBackground + ')'
        },
        onClick: this.handleCardClick.bind(this)
      })
    );
  };

  return Gallery;
}(Component);

var GalleryItem = function(_Component2) {
  _inherits(GalleryItem, _Component2);

  function GalleryItem(props) {
    _classCallCheck(this, GalleryItem);

    var _this4 = _possibleConstructorReturn(this, _Component2.call(this,
      props));

    console.log(_this4.props.background);
    return _this4;
  }

  GalleryItem.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    this.props.clickFunction(this.props.text, this.refs.el);
  };

  GalleryItem.prototype.render = function render() {
    var style = {
      'background-image': 'url(' + this.props.background + ')'
    };
    return React.createElement(
      'div', {
        ref: 'el',
        className: 'gallery-item ' + this.props.active,
        style: style,
        onClick: this.handleClick.bind(this)
      },
      this.props.children
    );
  };

  return GalleryItem;
}(Component);

var Card = function(_Component3) {
  _inherits(Card, _Component3);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this5 = _possibleConstructorReturn(this, _Component3.call(this,
      props));

    _this5.state = {
      transit: false
    };
    return _this5;
  }

  Card.prototype.handleClose = function handleClose(e) {
    var _this6 = this;

    e.preventDefault();
    this.setState({
      transit: true
    });
    this.timeout = setTimeout(function() {
      _this6.setState({
        transit: false
      });
      _this6.props.closeFunction();
    }, 400);
  };

  Card.prototype.render = function render() {
    var activeClass = this.props.active ? "active" : "";
    var transitClass = this.state.transit ? "transit" : "";
    return React.createElement(
      'div', {
        className: 'card ' + activeClass + ' ' + transitClass,
        style: {
          'left': this.props.left,
          'top': this.props.top
        }
      },
      React.createElement(
        'h2',
        null,
        this.props.title
      ),
      React.createElement(
        'a', {
          className: 'btn-close',
          onClick: this.handleClose.bind(this)
        },
        'Close x'
      ),
      React.createElement(
        'p',
        null,
        this.props.text
      )
    );
  };

  return Card;
}(Component);

ReactDOM.render(React.createElement(Gallery, null), document.getElementById(
  'portfolio'));
//# sourceURL=pen.js
