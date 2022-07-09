"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsUserAlreadyExist = IsUserAlreadyExist;
exports.IsUserAlreadyExistConstraint = void 0;

var _User = require("../../../../modules/users/infra/typeorm/entities/User");

var _classValidator = require("class-validator");

var _typeorm = require("typeorm");

var _dec, _class;

let IsUserAlreadyExistConstraint = (_dec = (0, _classValidator.ValidatorConstraint)({
  async: true
}), _dec(_class = class IsUserAlreadyExistConstraint {
  validate(username, args) {
    const {
      email
    } = args.object;
    const userRepository = (0, _typeorm.getRepository)(_User.User);
    return userRepository.findOne({
      where: [{
        email
      }, {
        username
      }]
    }).then(user => {
      if (user) return false;
      return true;
    });
  }

}) || _class);
exports.IsUserAlreadyExistConstraint = IsUserAlreadyExistConstraint;

function IsUserAlreadyExist(validationOptions) {
  return function (object, propertyName) {
    (0, _classValidator.registerDecorator)({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint
    });
  };
}