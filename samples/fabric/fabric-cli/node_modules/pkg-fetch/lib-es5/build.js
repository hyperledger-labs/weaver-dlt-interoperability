"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = require("fs-extra");

var _spawn = require("./spawn.js");

var _copyFile = require("./copy-file.js");

var _system = require("./system.js");

var _log = require("./log.js");

var _patches = _interopRequireDefault(require("../patches/patches.json"));

var _path = _interopRequireDefault(require("path"));

var _tempPath = require("./temp-path.js");

var _thresholds = _interopRequireDefault(require("./thresholds.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var buildPath;

if (process.env.GITHUB_USERNAME) {
  buildPath = _path.default.join(__dirname, '..', 'precompile');
} else {
  buildPath = (0, _tempPath.tempPath)();
}

var nodePath = _path.default.join(buildPath, 'node');

var patchesPath = _path.default.resolve(__dirname, '../patches');

var nodeRepo = 'https://github.com/nodejs/node';

function gitClone(_x) {
  return _gitClone.apply(this, arguments);
}

function _gitClone() {
  _gitClone = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(nodeVersion) {
    var args, promise;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _log.log.info('Cloning Node.js repository from GitHub...');

            args = ['clone', '-b', nodeVersion, '--depth', '1', '--single-branch', '--bare', '--progress', nodeRepo, 'node/.git'];
            promise = (0, _spawn.spawn)('git', args, {
              cwd: buildPath
            });
            (0, _spawn.progress)(promise, (0, _thresholds.default)('clone'));
            _context.next = 6;
            return promise;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _gitClone.apply(this, arguments);
}

function gitResetHard(_x2) {
  return _gitResetHard.apply(this, arguments);
}

function _gitResetHard() {
  _gitResetHard = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(nodeVersion) {
    var patches, commit, args;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _log.log.info(`Checking out ${nodeVersion}`);

            patches = _patches.default[nodeVersion];
            commit = patches.commit || nodeVersion;
            args = ['--work-tree', '.', 'reset', '--hard', commit];
            _context2.next = 6;
            return (0, _spawn.spawn)('git', args, {
              cwd: nodePath
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _gitResetHard.apply(this, arguments);
}

function applyPatches(_x3) {
  return _applyPatches.apply(this, arguments);
}

function _applyPatches() {
  _applyPatches = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(nodeVersion) {
    var patches, _iterator, _step, patch, patchPath, args;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _log.log.info('Applying patches');

            patches = _patches.default[nodeVersion];
            patches = patches.patches || patches;
            if (patches.sameAs) patches = _patches.default[patches.sameAs];
            _iterator = _createForOfIteratorHelper(patches);
            _context3.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context3.next = 15;
              break;
            }

            patch = _step.value;
            patchPath = _path.default.join(patchesPath, patch);
            args = ['-p1', '-i', patchPath];
            _context3.next = 13;
            return (0, _spawn.spawn)('patch', args, {
              cwd: nodePath
            });

          case 13:
            _context3.next = 7;
            break;

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](5);

            _iterator.e(_context3.t0);

          case 20:
            _context3.prev = 20;

            _iterator.f();

            return _context3.finish(20);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 17, 20, 23]]);
  }));
  return _applyPatches.apply(this, arguments);
}

function compileOnWindows(_x4, _x5) {
  return _compileOnWindows.apply(this, arguments);
}

function _compileOnWindows() {
  _compileOnWindows = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(nodeVersion, targetArch) {
    var args, major, promise;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            args = [];
            args.push('/c', 'vcbuild.bat', targetArch, 'noetw');
            major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
            if (major <= 10) args.push('nosign', 'noperfctr');
            promise = (0, _spawn.spawn)('cmd', args, {
              cwd: nodePath
            });
            (0, _spawn.progress)(promise, (0, _thresholds.default)('vcbuild', nodeVersion));
            _context4.next = 8;
            return promise;

          case 8:
            if (!(major <= 10)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", _path.default.join(nodePath, 'Release/node.exe'));

          case 10:
            return _context4.abrupt("return", _path.default.join(nodePath, 'out/Release/node.exe'));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _compileOnWindows.apply(this, arguments);
}

function compileOnUnix(_x6, _x7) {
  return _compileOnUnix.apply(this, arguments);
}

function _compileOnUnix() {
  _compileOnUnix = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(nodeVersion, targetArch) {
    var args, cpu, major, make, promise, output;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            args = [];
            cpu = {
              x86: 'ia32',
              x64: 'x64',
              armv6: 'arm',
              armv7: 'arm',
              arm64: 'arm64',
              ppc64: 'ppc64',
              s390x: 's390x'
            }[targetArch];
            args.push('--dest-cpu', cpu); // first of all v8_inspector introduces the use
            // of `prime_rehash_policy` symbol that requires
            // GLIBCXX_3.4.18 on some systems
            // also we don't support any kind of debugging
            // against packaged apps, hence v8_inspector is useless

            major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
            if (major >= 6) args.push('--without-inspector'); // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L33

            if (_system.hostPlatform === 'alpine') args.push('--without-snapshot'); // TODO same for windows?

            _context5.next = 8;
            return (0, _spawn.spawn)('./configure', args, {
              cwd: nodePath
            });

          case 8:
            make = _system.hostPlatform === 'freebsd' ? 'gmake' : 'make';
            promise = (0, _spawn.spawn)(make, [], {
              cwd: nodePath
            });
            (0, _spawn.progress)(promise, (0, _thresholds.default)('make', nodeVersion));
            _context5.next = 13;
            return promise;

          case 13:
            output = _path.default.join(nodePath, 'out/Release/node'); // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L36

            if (!(_system.hostPlatform === 'alpine')) {
              _context5.next = 17;
              break;
            }

            _context5.next = 17;
            return (0, _spawn.spawn)('paxctl', ['-cm', output]);

          case 17:
            return _context5.abrupt("return", output);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _compileOnUnix.apply(this, arguments);
}

function compile(_x8, _x9) {
  return _compile.apply(this, arguments);
}

function _compile() {
  _compile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(nodeVersion, targetArch) {
    var win;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _log.log.info('Compiling Node.js from sources...');

            win = _system.hostPlatform === 'win';

            if (!win) {
              _context6.next = 6;
              break;
            }

            _context6.next = 5;
            return compileOnWindows(nodeVersion, targetArch);

          case 5:
            return _context6.abrupt("return", _context6.sent);

          case 6:
            _context6.next = 8;
            return compileOnUnix(nodeVersion, targetArch);

          case 8:
            return _context6.abrupt("return", _context6.sent);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _compile.apply(this, arguments);
}

function build(_x10, _x11, _x12) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(nodeVersion, targetArch, local) {
    var output;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _fsExtra.remove)(buildPath);

          case 2:
            _context7.next = 4;
            return (0, _fsExtra.mkdirp)(buildPath);

          case 4:
            _context7.next = 6;
            return gitClone(nodeVersion);

          case 6:
            _context7.next = 8;
            return gitResetHard(nodeVersion);

          case 8:
            _context7.next = 10;
            return applyPatches(nodeVersion);

          case 10:
            _context7.next = 12;
            return compile(nodeVersion, targetArch);

          case 12:
            output = _context7.sent;
            _context7.next = 15;
            return (0, _fsExtra.mkdirp)(_path.default.dirname(local));

          case 15:
            _context7.next = 17;
            return (0, _copyFile.copyFile)(output, local);

          case 17:
            _context7.next = 19;
            return (0, _fsExtra.remove)(buildPath);

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _build.apply(this, arguments);
}