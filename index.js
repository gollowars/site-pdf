'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

var _phantomPool = require('phantom-pool');

var _phantomPool2 = _interopRequireDefault(_phantomPool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = require('debug')('phantompdf');

function dryRender(page, output, wait) {
  new Promise(function (resolve, reject) {
    setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              resolve();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })), wait);
  });
}

var SitePDF = function () {
  function SitePDF() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SitePDF);

    this.options = options;
    this.pool = null;

    this.init();
  }

  _createClass(SitePDF, [{
    key: 'init',
    value: function init() {
      var phantomArgs = [];
      if (this.options.phantomArgs != undefined) {
        phantomArgs = this.options.phantomArgs;
      }
      this.pool = (0, _phantomPool2.default)({
        max: 10, // default
        min: 2, // default
        // how long a resource can stay idle in pool before being removed
        idleTimeoutMillis: 30000, // default.
        // maximum number of times an individual resource can be reused before being destroyed; set to 0 to disable
        maxUses: 50, // default
        // function to validate an instance prior to use; see https://github.com/coopernurse/node-pool#createpool
        validator: function validator() {
          return Promise.resolve(true);
        }, // defaults to always resolving true
        // validate resource before borrowing; required for `maxUses and `validator`
        testOnBorrow: true, // default
        // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
        phantomArgs: phantomArgs // arguments passed to phantomjs-node directly, default is `[]`. For all opts, see https://github.com/amir20/phantomjs-node#phantom-object-api
      });
    }
  }, {
    key: 'create',
    value: function create(url, output) {

      var options = this.options;
      var pool = this.pool;
      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
          var _this = this;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  pool.use(function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(instance) {
                      var page, cookies, value, _value, _value2, status, content;

                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return instance.createPage().catch(function (e) {
                                console.log('error:', e);
                              });

                            case 2:
                              page = _context2.sent;

                              if (!(options.cookie != undefined)) {
                                _context2.next = 10;
                                break;
                              }

                              _context2.next = 6;
                              return page.addCookie(options.cookie).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 6:
                              _context2.next = 8;
                              return page.property('cookies').catch(function (e) {
                                console.log('error:', e);
                              });

                            case 8:
                              cookies = _context2.sent;

                              debug('cookies:', cookies);

                            case 10:
                              if (!(options.userAgent != undefined)) {
                                _context2.next = 17;
                                break;
                              }

                              _context2.next = 13;
                              return page.setting('userAgent', options.userAgent).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 13:
                              _context2.next = 15;
                              return page.setting('userAgent').catch(function (e) {
                                console.log('error:', e);
                              });

                            case 15:
                              value = _context2.sent;

                              debug('agent :', value);
                              // page.settings.userAgent = options.userAgent

                            case 17:
                              if (!(options.viewportSize != undefined)) {
                                _context2.next = 24;
                                break;
                              }

                              _context2.next = 20;
                              return page.property('viewportSize', options.viewportSize).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 20:
                              _context2.next = 22;
                              return page.property('viewportSize').catch(function (e) {
                                console.log('error:', e);
                              });

                            case 22:
                              _value = _context2.sent;

                              debug('viewportSize :', _value);
                              // page.settings.userAgent = options.userAgent

                            case 24:
                              if (!(options.paperSize != undefined)) {
                                _context2.next = 31;
                                break;
                              }

                              _context2.next = 27;
                              return page.property('paperSize', options.paperSize).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 27:
                              _context2.next = 29;
                              return page.property('paperSize').catch(function (e) {
                                console.log('error:', e);
                              });

                            case 29:
                              _value2 = _context2.sent;

                              debug('paperSize :', _value2);
                              // page.settings.userAgent = options.userAgent

                            case 31:
                              _context2.next = 33;
                              return page.on("onResourceRequested", function (requestData) {
                                debug('Requesting', requestData.url);
                              }).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 33:
                              _context2.next = 35;
                              return page.open(url);

                            case 35:
                              status = _context2.sent;
                              _context2.next = 38;
                              return page.property('content');

                            case 38:
                              content = _context2.sent;

                              if (!(options.dry === true)) {
                                _context2.next = 44;
                                break;
                              }

                              _context2.next = 42;
                              return dryRender(page, output, 10);

                            case 42:
                              _context2.next = 46;
                              break;

                            case 44:
                              _context2.next = 46;
                              return page.render(output).catch(function (e) {
                                console.log('error:', e);
                              });

                            case 46:
                              return _context2.abrupt('return', status);

                            case 47:
                            case 'end':
                              return _context2.stop();
                          }
                        }
                      }, _callee2, _this);
                    }));

                    return function (_x3) {
                      return _ref3.apply(this, arguments);
                    };
                  }()).then(function (status) {
                    resolve(status);
                  });

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      this.pool.drain().then(function () {
        return _this2.pool.clear();
      });
    }
  }]);

  return SitePDF;
}();

module.exports = SitePDF;
