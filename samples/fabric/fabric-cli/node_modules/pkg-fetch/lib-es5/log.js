"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wasReported = wasReported;
exports.log = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _progress = _interopRequireDefault(require("progress"));

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Log = /*#__PURE__*/function () {
  function Log() {
    (0, _classCallCheck2.default)(this, Log);
  }

  (0, _createClass2.default)(Log, [{
    key: "_lines",
    value: function _lines(lines) {
      if (lines === undefined) return;

      if (!Array.isArray(lines)) {
        console.log(`  ${lines}`);
        return;
      }

      var _iterator = _createForOfIteratorHelper(lines),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          console.log(`  ${line}`);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "debug",
    value: function debug(text, lines) {
      if (!this.debugMode) return;
      console.log(`> ${_chalk.default.green('[debug]')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "info",
    value: function info(text, lines) {
      console.log(`> ${text}`);

      this._lines(lines);
    }
  }, {
    key: "warn",
    value: function warn(text, lines) {
      console.log(`> ${_chalk.default.blue('Warning')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "error",
    value: function error(text, lines) {
      if (text.stack) text = text.stack;
      console.log(`> ${_chalk.default.red('Error!')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "enableProgress",
    value: function enableProgress(text) {
      (0, _assert.default)(!this.bar);
      text += ' '.repeat(28 - text.length);
      this.bar = new _progress.default(`  ${text} [:bar] :percent`, {
        stream: process.stdout,
        width: 20,
        complete: '=',
        incomplete: ' ',
        total: 100
      });
    }
  }, {
    key: "showProgress",
    value: function showProgress(percentage) {
      if (!this.bar) return;
      this.bar.update(percentage / 100);
    }
  }, {
    key: "disableProgress",
    value: function disableProgress() {
      if (!this.bar) return; // avoid empty line

      if (!this.bar.complete) {
        this.bar.terminate();
      }

      delete this.bar;
    }
  }]);
  return Log;
}();

var log = new Log();
exports.log = log;

function wasReported(error, lines) {
  if (error === undefined) {
    error = new Error('No message');
  } else if (typeof error === 'string') {
    log.error(error, lines);
    error = new Error(error);
  }

  error.wasReported = true;
  return error;
}