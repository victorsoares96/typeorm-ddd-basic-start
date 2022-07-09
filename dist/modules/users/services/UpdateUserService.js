"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserService = void 0;

var _classValidator = require("class-validator");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _AccessProfilesRepositoryMethods = require("../../accessProfiles/repositories/AccessProfilesRepositoryMethods");

var _eErrors = require("../../accessProfiles/utils/enums/e-errors");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _eErrors2 = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserService {
  constructor(usersRepository, accessProfilesRepository) {
    this.usersRepository = usersRepository;
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async execute(userData) {
    const {
      id,
      accessProfileId
    } = userData;
    if (!id) throw new _AppError.AppError(_eErrors2.EUserError.IdIsRequired);
    if (!accessProfileId) throw new _AppError.AppError(_eErrors.EAccessProfileError.IdIsRequired);
    const user = await this.usersRepository.findOne({
      id
    });
    if (!user) throw new _AppError.AppError(_eErrors2.EUserError.NotFound);
    const accessProfile = await this.accessProfilesRepository.findOne({
      id: accessProfileId
    });
    if (!accessProfile) throw new _AppError.AppError(_eErrors.EAccessProfileError.NotFound);
    delete userData.accessProfileId;
    const [error] = await (0, _classValidator.validate)({ ...user,
      ...userData,
      accessProfile
    }, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    const [updatedUser] = await this.usersRepository.update([{ ...user,
      ...userData,
      accessProfile
    }]);
    return updatedUser;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserService = UpdateUserService;