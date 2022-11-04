"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refiner;

var _path = _interopRequireDefault(require("path"));

var _common = require("../prelude/common");

const win32 = process.platform === 'win32';

function hasParent(file, records) {
  const dirname = _path.default.dirname(file);

  if (dirname === file) return false; // root directory

  return Boolean(records[dirname]);
}

function purgeTopDirectories(records) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let found = false;

    for (const file in records) {
      if (records[file]) {
        const record = records[file];
        const links = record[_common.STORE_LINKS];

        if (links && links.length === 1) {
          if (!hasParent(file, records)) {
            const file2 = _path.default.join(file, links[0]);

            const record2 = records[file2];
            const links2 = record2[_common.STORE_LINKS];

            if (links2 && links2.length === 1) {
              const file3 = _path.default.join(file2, links2[0]);

              const record3 = records[file3];
              const links3 = record3[_common.STORE_LINKS];

              if (links3) {
                // eslint-disable-next-line no-param-reassign
                delete records[file];
                found = true;
              }
            }
          }
        }
      }
    }

    if (!found) break;
  }
}

function denominate(records, entrypoint, denominator) {
  const newRecords = {};

  for (const file in records) {
    if (records[file]) {
      let snap = (0, _common.substituteDenominator)(file, denominator);

      if (win32) {
        if (snap.slice(1) === ':') snap += '\\';
      } else if (snap === '') {
        snap = '/';
      }

      newRecords[snap] = records[file];
    }
  }

  return {
    records: newRecords,
    entrypoint: (0, _common.substituteDenominator)(entrypoint, denominator)
  };
}

function refiner(records, entrypoint) {
  purgeTopDirectories(records);
  const denominator = (0, _common.retrieveDenominator)(Object.keys(records));
  return denominate(records, entrypoint, denominator);
}