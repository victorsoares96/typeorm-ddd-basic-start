"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/ban-types */
const tmpFolder = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: _path.default.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: _multer.default.diskStorage({
      destination(request, file, callback) {
        callback(null, tmpFolder);
      },

      filename(request, file, callback) {
        const fileHash = _crypto.default.randomBytes(10).toString('hex');

        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'typeorm-tdd-basic-start'
    }
  }
};
exports.default = _default;