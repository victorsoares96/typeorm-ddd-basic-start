"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsValidPassword = IsValidPassword;
exports.IsValidPasswordConstraint = void 0;

var _classValidator = require("class-validator");

var _dec, _class;

let IsValidPasswordConstraint = (_dec = (0, _classValidator.ValidatorConstraint)(), _dec(_class = class IsValidPasswordConstraint {
  validate(password) {
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return isValidPassword.test(password);
  }

}) || _class);
exports.IsValidPasswordConstraint = IsValidPasswordConstraint;

function IsValidPassword(validationOptions) {
  return function (object, propertyName) {
    (0, _classValidator.registerDecorator)({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordConstraint
    });
  };
}