"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cloud = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fsExtra = require("fs-extra");

var _github = require("./github.js");

var _assert = _interopRequireDefault(require("assert"));

var _copyFile = require("./copy-file.js");

var _path = _interopRequireDefault(require("path"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function uniqueName(name, names) {
  if (names.indexOf(name) < 0) return name;
  var newName;
  var counter = 0;

  while (true) {
    newName = `${name}-new-${counter}`;
    if (names.indexOf(newName) < 0) return newName;
    counter += 1;
  }
}

var Cloud = /*#__PURE__*/function () {
  function Cloud(_ref) {
    var owner = _ref.owner,
        repo = _ref.repo;
    (0, _classCallCheck2.default)(this, Cloud);
    this.gh = new _github.GitHub({
      owner,
      repo
    });
  }

  (0, _createClass2.default)(Cloud, [{
    key: "_findRelease",
    value: function () {
      var _findRelease2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(tag) {
        var release;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.gh.getRelease(tag);

              case 2:
                release = _context.sent;

                if (release) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this.gh.getReleaseDraft(tag);

              case 6:
                release = _context.sent;

              case 7:
                if (release) {
                  _context.next = 11;
                  break;
                }

                _context.next = 10;
                return this.gh.createRelease(tag);

              case 10:
                release = _context.sent;

              case 11:
                return _context.abrupt("return", release);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _findRelease(_x) {
        return _findRelease2.apply(this, arguments);
      }

      return _findRelease;
    }()
  }, {
    key: "alreadyUploaded",
    value: function () {
      var _alreadyUploaded = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(remote) {
        var release;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._findRelease(remote.tag);

              case 2:
                release = _context2.sent;
                return _context2.abrupt("return", release.assets.some(function (_ref2) {
                  var name = _ref2.name;
                  (0, _assert.default)(name);
                  return remote.name === name;
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function alreadyUploaded(_x2) {
        return _alreadyUploaded.apply(this, arguments);
      }

      return alreadyUploaded;
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(local, remote) {
        var release, names, name;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._findRelease(remote.tag);

              case 2:
                release = _context3.sent;
                names = release.assets.map(function (_ref3) {
                  var name = _ref3.name;
                  (0, _assert.default)(name);
                  return name;
                });
                name = uniqueName(remote.name, names);
                _context3.next = 7;
                return this.gh.uploadAsset(local, release, name);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function upload(_x3, _x4) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
  }, {
    key: "uploadMany",
    value: function () {
      var _uploadMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(items) {
        var _iterator, _step, item, local, remote;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(items);
                _context4.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context4.next = 10;
                  break;
                }

                item = _step.value;
                local = item.local, remote = item.remote;
                _context4.next = 8;
                return this.upload(local, remote);

              case 8:
                _context4.next = 3;
                break;

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](1);

                _iterator.e(_context4.t0);

              case 15:
                _context4.prev = 15;

                _iterator.f();

                return _context4.finish(15);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 12, 15, 18]]);
      }));

      function uploadMany(_x5) {
        return _uploadMany.apply(this, arguments);
      }

      return uploadMany;
    }()
  }, {
    key: "download",
    value: function () {
      var _download = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(remote, local) {
        var tag, tempFile, short, ok, release, assets, asset;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                tag = remote.tag;
                tempFile = local + '.downloading';
                _context5.next = 4;
                return (0, _fsExtra.mkdirp)(_path.default.dirname(tempFile));

              case 4:
                short = _path.default.basename(local);
                _context5.next = 7;
                return this.gh.tryDirectly(tag, remote.name, tempFile, short);

              case 7:
                ok = _context5.sent;

                if (ok) {
                  _context5.next = 25;
                  break;
                }

                _context5.next = 11;
                return this.gh.getRelease(tag);

              case 11:
                release = _context5.sent;

                if (release) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 15;
                return this.gh.getReleaseDraft(tag);

              case 15:
                release = _context5.sent;

              case 16:
                if (release) {
                  _context5.next = 18;
                  break;
                }

                return _context5.abrupt("return", false);

              case 18:
                assets = release.assets.filter(function (_ref4) {
                  var name = _ref4.name;
                  (0, _assert.default)(name);
                  return name === remote.name;
                });

                if (assets.length) {
                  _context5.next = 21;
                  break;
                }

                return _context5.abrupt("return", false);

              case 21:
                (0, _assert.default)(assets.length === 1);
                asset = assets[0];
                _context5.next = 25;
                return this.gh.downloadUrl(asset.url, tempFile, short);

              case 25:
                _context5.next = 27;
                return (0, _fsExtra.remove)(local);

              case 27:
                _context5.next = 29;
                return (0, _copyFile.moveFile)(tempFile, local);

              case 29:
                _context5.next = 31;
                return (0, _fsExtra.remove)(tempFile);

              case 31:
                return _context5.abrupt("return", true);

              case 32:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function download(_x6, _x7) {
        return _download.apply(this, arguments);
      }

      return download;
    }()
  }, {
    key: "downloadMany",
    value: function () {
      var _downloadMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(items) {
        var _iterator2, _step2, item, remote, local;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _iterator2 = _createForOfIteratorHelper(items);
                _context6.prev = 1;

                _iterator2.s();

              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.next = 10;
                  break;
                }

                item = _step2.value;
                remote = item.remote, local = item.local;
                _context6.next = 8;
                return this.download(remote, local);

              case 8:
                _context6.next = 3;
                break;

              case 10:
                _context6.next = 15;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](1);

                _iterator2.e(_context6.t0);

              case 15:
                _context6.prev = 15;

                _iterator2.f();

                return _context6.finish(15);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 12, 15, 18]]);
      }));

      function downloadMany(_x8) {
        return _downloadMany.apply(this, arguments);
      }

      return downloadMany;
    }()
  }]);
  return Cloud;
}();

exports.Cloud = Cloud;