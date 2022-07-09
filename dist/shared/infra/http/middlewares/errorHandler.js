"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

var _AppError = require("../../../errors/AppError");

var _eErrors = require("../../../utils/enums/e-errors");

function errorHandler(error, request, response, _) {
  if (error instanceof _AppError.AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: _eErrors.EGenericError.InternalError
  });
}