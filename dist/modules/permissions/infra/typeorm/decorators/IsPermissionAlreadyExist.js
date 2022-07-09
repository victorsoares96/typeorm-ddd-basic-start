"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsPermissionAlreadyExist = IsPermissionAlreadyExist;
exports.IsPermissionAlreadyExistConstraint = void 0;

var _classValidator = require("class-validator");

var _tsyringe = require("tsyringe");

var _FindManyPermissionService = require("../../../services/FindManyPermissionService");

var _dec, _class;

let IsPermissionAlreadyExistConstraint = (_dec = (0, _classValidator.ValidatorConstraint)({
  async: true
}), _dec(_class = class IsPermissionAlreadyExistConstraint {
  validate(name) {
    const findPermission = _tsyringe.container.resolve(_FindManyPermissionService.FindManyPermissionService);

    return findPermission.execute({
      name
    }).then(([permissions]) => {
      if (permissions.length > 0) {
        return false;
      }

      return true;
    });
  }

}) || _class);
exports.IsPermissionAlreadyExistConstraint = IsPermissionAlreadyExistConstraint;

function IsPermissionAlreadyExist(validationOptions) {
  return function (object, propertyName) {
    (0, _classValidator.registerDecorator)({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPermissionAlreadyExistConstraint
    });
  };
}