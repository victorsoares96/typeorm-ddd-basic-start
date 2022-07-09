"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsAccessProfileAlreadyExist = IsAccessProfileAlreadyExist;
exports.IsAccessProfileAlreadyExistConstraint = void 0;

var _FindOneAccessProfileService = require("../../../services/FindOneAccessProfileService");

var _classValidator = require("class-validator");

var _tsyringe = require("tsyringe");

var _dec, _class;

let IsAccessProfileAlreadyExistConstraint = (_dec = (0, _classValidator.ValidatorConstraint)({
  async: true
}), _dec(_class = class IsAccessProfileAlreadyExistConstraint {
  validate(name) {
    const findAccessProfile = _tsyringe.container.resolve(_FindOneAccessProfileService.FindOneAccessProfileService);

    return findAccessProfile.execute({
      name
    }).then(accessProfile => {
      console.log(accessProfile);
      if (accessProfile) return false;
      return true;
    });
  }

}) || _class);
exports.IsAccessProfileAlreadyExistConstraint = IsAccessProfileAlreadyExistConstraint;

function IsAccessProfileAlreadyExist(validationOptions) {
  return function (object, propertyName) {
    (0, _classValidator.registerDecorator)({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAccessProfileAlreadyExistConstraint
    });
  };
}