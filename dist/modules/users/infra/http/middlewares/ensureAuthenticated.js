"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = require("../../../../../shared/errors/AppError");

var _eErrors = require("../../../utils/enums/e-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  return next();
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new _AppError.AppError(_eErrors.ESessionError.MissingJWT, 401);
  const [, token] = authHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub,
      name
    } = decoded;
    request.user = {
      id: sub,
      name
    };
    return next();
  } catch {
    throw new _AppError.AppError(_eErrors.ESessionError.InvalidJWT, 401);
  }
}