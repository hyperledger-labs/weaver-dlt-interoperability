"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontBuild = dontBuild;
exports.main = main;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _system = require("./system.js");

var _places = require("./places.js");

var _log = require("./log.js");

var _cloud = require("./cloud.js");

var _build = _interopRequireDefault(require("./build.js"));

var _patches = _interopRequireDefault(require("../patches/patches.json"));

var _path = _interopRequireDefault(require("path"));

var _verify = require("./verify.js");

var _package = require("../package.json");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cloud = new _cloud.Cloud({
  owner: 'zeit',
  repo: 'pkg-fetch'
});

function dontBuild(nodeVersion, targetPlatform, targetArch) {
  // binaries are not provided for x86 anymore
  if (targetPlatform !== 'win' && targetArch === 'x86') return true; // https://support.apple.com/en-us/HT201948
  // don't disable macos-x86 because it is not possible
  // to cross-compile for x86 from macos otherwise

  var major = nodeVersion.match(/^v?(\d+)/)[1] | 0; // node 0.12 does not compile on arm

  if (/^arm/.test(targetArch) && major === 0) return true;
  if (targetPlatform === 'freebsd' && major < 4) return true;
  if (targetPlatform === 'alpine' && (targetArch !== 'x64' || major < 6)) return true;
  return false;
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var nodeVersion, _iterator, _step, targetArch, local, remote, short;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (process.env.GITHUB_USERNAME) {
              _context.next = 2;
              break;
            }

            throw (0, _log.wasReported)('No github credentials. Upload will fail!');

          case 2:
            _context.t0 = _regenerator.default.keys(_patches.default);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 47;
              break;
            }

            nodeVersion = _context.t1.value;
            _iterator = _createForOfIteratorHelper(_system.targetArchs);
            _context.prev = 6;

            _iterator.s();

          case 8:
            if ((_step = _iterator.n()).done) {
              _context.next = 37;
              break;
            }

            targetArch = _step.value;

            if (!dontBuild(nodeVersion, _system.hostPlatform, targetArch)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("continue", 35);

          case 12:
            local = (0, _places.localPlace)({
              from: 'built',
              arch: targetArch,
              nodeVersion,
              platform: _system.hostPlatform,
              version: _package.version
            });
            remote = (0, _places.remotePlace)({
              arch: targetArch,
              nodeVersion,
              platform: _system.hostPlatform,
              version: _package.version
            });
            _context.next = 16;
            return cloud.alreadyUploaded(remote);

          case 16:
            if (!_context.sent) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("continue", 35);

          case 18:
            short = _path.default.basename(local);

            _log.log.info(`Building ${short}...`);

            _context.next = 22;
            return (0, _build.default)(nodeVersion, targetArch, local);

          case 22:
            _log.log.info(`Verifying ${short}...`);

            _context.next = 25;
            return (0, _verify.verify)(local);

          case 25:
            _log.log.info(`Uploading ${short}...`);

            _context.prev = 26;
            _context.next = 29;
            return cloud.upload(local, remote);

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t2 = _context["catch"](26);
            // TODO catch only network errors
            if (!_context.t2.wasReported) _log.log.error(_context.t2);

            _log.log.info('Meanwhile i will continue making binaries');

          case 35:
            _context.next = 8;
            break;

          case 37:
            _context.next = 42;
            break;

          case 39:
            _context.prev = 39;
            _context.t3 = _context["catch"](6);

            _iterator.e(_context.t3);

          case 42:
            _context.prev = 42;

            _iterator.f();

            return _context.finish(42);

          case 45:
            _context.next = 3;
            break;

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 39, 42, 45], [26, 31]]);
  }));
  return _main.apply(this, arguments);
}

if (!module.parent) {
  main().catch(function (error) {
    if (!error.wasReported) _log.log.error(error);
    process.exit(2);
  });
}