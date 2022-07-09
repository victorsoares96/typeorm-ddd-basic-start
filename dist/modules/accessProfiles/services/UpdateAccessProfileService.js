"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateAccessProfileService = void 0;

var _tsyringe = require("tsyringe");

var _classValidator = require("class-validator");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../permissions/utils/enums/e-errors");

var _PermissionsRepositoryMethods = require("../../permissions/repositories/PermissionsRepositoryMethods");

var _AccessProfilesRepositoryMethods = require("../repositories/AccessProfilesRepositoryMethods");

var _eErrors2 = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateAccessProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods, typeof _PermissionsRepositoryMethods.PermissionsRepositoryMethods === "undefined" ? Object : _PermissionsRepositoryMethods.PermissionsRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAccessProfileService {
  constructor(accessProfilesRepository, permissionsRepository) {
    this.accessProfilesRepository = accessProfilesRepository;
    this.permissionsRepository = permissionsRepository;
  }

  async execute(accessProfileData) {
    const {
      id,
      permissionsId
    } = accessProfileData;
    if (accessProfileData.name && accessProfileData.name.length < 3) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooShort);
    if (accessProfileData.name && accessProfileData.name.length > 35) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooLong);
    if (!id) throw new _AppError.AppError(_eErrors2.EAccessProfileError.IdIsRequired);
    if (!permissionsId) throw new _AppError.AppError(_eErrors.EPermissionError.IsRequired);
    const accessProfile = await this.accessProfilesRepository.findOne({
      id
    });
    if (!accessProfile) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NotFound);
    const permissionsArray = permissionsId.split(',');
    const permissions = await this.permissionsRepository.findByIds(permissionsArray);
    if (!permissions) throw new _AppError.AppError(_eErrors.EPermissionError.NotFound);
    delete accessProfileData.permissionsId;
    const [error] = await (0, _classValidator.validate)({ ...accessProfile,
      ...accessProfileData,
      permissions
    }, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    const [updatedAccessProfile] = await this.accessProfilesRepository.update([{ ...accessProfile,
      ...accessProfileData,
      permissions
    }]);
    return updatedAccessProfile;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateAccessProfileService = UpdateAccessProfileService;