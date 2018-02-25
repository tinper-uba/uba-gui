webpackJsonp([0],{

/***/ 152:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);



/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(607), __esModule: true };

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = __webpack_require__(119);

var _layout2 = _interopRequireDefault(_layout);

__webpack_require__(199);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

var _Head = __webpack_require__(590);

var _Head2 = _interopRequireDefault(_Head);

var _routes = __webpack_require__(593);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer;


var App = function App() {
  return _react2.default.createElement(
    _mirrorx.Router,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _layout2.default,
        { className: 'layout' },
        _react2.default.createElement(_mirrorx.Route, { path: '*', component: _Head2.default }),
        _react2.default.createElement(
          Content,
          { style: { padding: '0 50px' } },
          _react2.default.createElement(
            'div',
            { style: { background: '#fff', padding: 24, minHeight: 280 } },
            _react2.default.createElement(_routes2.default, null)
          )
        ),
        _react2.default.createElement(
          Footer,
          { style: { textAlign: 'center' } },
          'uba \xA92018 Created by Kvkens'
        )
      )
    )
  );
};

exports.default = App;

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_style_css__ = __webpack_require__(554);


// style dependencies


/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);



/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _menu = __webpack_require__(120);

var _menu2 = _interopRequireDefault(_menu);

var _layout = __webpack_require__(119);

var _layout2 = _interopRequireDefault(_layout);

__webpack_require__(519);

__webpack_require__(199);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _layout2.default.Header;


var Head = function Head(_ref) {
    var location = _ref.location;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            Header,
            null,
            _react2.default.createElement('div', { className: 'logo' }),
            _react2.default.createElement(
                _menu2.default,
                {
                    theme: 'dark',
                    mode: 'horizontal',
                    defaultSelectedKeys: [location.pathname],
                    style: { lineHeight: '64px' }
                },
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/' },
                        '\u9996\u9875'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/user' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/user' },
                        '\u7528\u6237'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/admin' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/admin' },
                        '\u7BA1\u7406'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/demo1' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/demo1' },
                        '\u7BA1\u74061'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/demo2' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/demo2' },
                        '\u7BA1\u74062'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/demo3' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/demo3' },
                        '\u7BA1\u74063'
                    )
                )
            )
        )
    );
};

exports.default = Head;

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(91);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = __webpack_require__(127);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(126);

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = __webpack_require__(207);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'Hello Mirror'
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

var _mirrorx2 = _interopRequireDefault(_mirrorx);

var _App = __webpack_require__(462);

var _App2 = _interopRequireDefault(_App);

__webpack_require__(463);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mirrorx2.default.defaults({
    historyMode: 'hash'
});

(0, _mirrorx.render)(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(91);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = __webpack_require__(127);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(126);

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = __webpack_require__(207);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

var _Home = __webpack_require__(591);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var Routes = function (_Component) {
    _inherits(Routes, _Component);

    function Routes() {
        _classCallCheck(this, Routes);

        return _possibleConstructorReturn(this, (Routes.__proto__ || (0, _getPrototypeOf2.default)(Routes)).apply(this, arguments));
    }

    _createClass(Routes, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _mirrorx.Switch,
                null,
                _react2.default.createElement(_mirrorx.Route, { exact: true, path: '/', component: _Home2.default })
            );
        }
    }]);

    return Routes;
}(_react.Component);

exports.default = Routes;

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(638);
module.exports = __webpack_require__(26).Object.getPrototypeOf;


/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(40);
var core = __webpack_require__(26);
var fails = __webpack_require__(60);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(94);
var $getPrototypeOf = __webpack_require__(215);

__webpack_require__(627)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 728:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 729:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[592]);
//# sourceMappingURL=app.js.map