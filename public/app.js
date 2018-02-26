webpackJsonp([0],{

/***/ 102:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(608), __esModule: true };

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = __webpack_require__(199);

var _layout2 = _interopRequireDefault(_layout);

__webpack_require__(513);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

var _LeftMenu = __webpack_require__(592);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _routes = __webpack_require__(594);

var _routes2 = _interopRequireDefault(_routes);

__webpack_require__(732);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer,
    Sider = _layout2.default.Sider;


var App = function App() {
  return _react2.default.createElement(
    _mirrorx.Router,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(
          Sider,
          { style: { background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0 } },
          _react2.default.createElement(
            'div',
            { className: 'logo' },
            '\u6211\u7684\u9879\u76EE'
          ),
          _react2.default.createElement(_mirrorx.Route, { path: '*', component: _LeftMenu2.default })
        ),
        _react2.default.createElement(
          _layout2.default,
          { style: { marginLeft: 200 } },
          _react2.default.createElement(
            Content,
            { style: { margin: '0', overflow: 'initial' } },
            _react2.default.createElement(
              'div',
              { style: { padding: 10, background: '#fff' } },
              _react2.default.createElement(_mirrorx.Route, { exact: true, path: '/', render: function render() {
                  return _react2.default.createElement(
                    'div',
                    null,
                    'home'
                  );
                } }),
              _react2.default.createElement(_mirrorx.Route, { exact: true, path: '/menu2', render: function render() {
                  return _react2.default.createElement(
                    'div',
                    null,
                    'menu2'
                  );
                } }),
              _react2.default.createElement(_mirrorx.Route, { exact: true, path: '/menu3', render: function render() {
                  return _react2.default.createElement(
                    'div',
                    null,
                    'menu3'
                  );
                } })
            )
          )
        )
      )
    )
  );
};

exports.default = App;

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);


/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);



/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_style_css__ = __webpack_require__(555);


// style dependencies


/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);



/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(74);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = __webpack_require__(93);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(92);

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = __webpack_require__(128);

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(74);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = __webpack_require__(93);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(92);

var _create2 = _interopRequireDefault(_create);

var _menu = __webpack_require__(122);

var _menu2 = _interopRequireDefault(_menu);

var _icon = __webpack_require__(13);

var _icon2 = _interopRequireDefault(_icon);

var _getPrototypeOf = __webpack_require__(128);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(520);

__webpack_require__(505);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftMenu = function (_Component) {
    _inherits(LeftMenu, _Component);

    function LeftMenu() {
        _classCallCheck(this, LeftMenu);

        return _possibleConstructorReturn(this, (LeftMenu.__proto__ || (0, _getPrototypeOf2.default)(LeftMenu)).apply(this, arguments));
    }

    _createClass(LeftMenu, [{
        key: 'render',
        value: function render() {
            var location = this.props.location;

            return _react2.default.createElement(
                _menu2.default,
                { theme: 'light', mode: 'inline', defaultSelectedKeys: [location.pathname] },
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/' },
                        _react2.default.createElement(_icon2.default, { type: 'appstore-o' }),
                        '\u6F14\u793A\u9879\u76EE 1'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/menu2' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/menu2' },
                        _react2.default.createElement(_icon2.default, { type: 'appstore-o' }),
                        '\u6F14\u793A\u9879\u76EE 2'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/menu3' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/menu3' },
                        _react2.default.createElement(_icon2.default, { type: 'appstore-o' }),
                        '\u6F14\u793A\u9879\u76EE 3'
                    )
                ),
                _react2.default.createElement(
                    _menu2.default.Item,
                    { key: '/menu4' },
                    _react2.default.createElement(
                        _mirrorx.NavLink,
                        { to: '/menu4' },
                        _react2.default.createElement(_icon2.default, { type: 'appstore-o' }),
                        '\u6F14\u793A\u9879\u76EE 4'
                    )
                )
            );
        }
    }]);

    return LeftMenu;
}(_react.Component);

exports.default = LeftMenu;

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mirrorx = __webpack_require__(56);

var _mirrorx2 = _interopRequireDefault(_mirrorx);

var _App = __webpack_require__(461);

var _App2 = _interopRequireDefault(_App);

__webpack_require__(462);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mirrorx2.default.defaults({
    historyMode: 'hash'
});

(0, _mirrorx.render)(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = __webpack_require__(74);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = __webpack_require__(93);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(92);

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = __webpack_require__(128);

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

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(639);
module.exports = __webpack_require__(26).Object.getPrototypeOf;


/***/ }),

/***/ 628:
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

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(96);
var $getPrototypeOf = __webpack_require__(214);

__webpack_require__(628)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 729:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 732:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[593]);
//# sourceMappingURL=app.js.map