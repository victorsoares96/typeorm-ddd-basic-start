"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAccessProfileService = void 0;

var _tsyringe = require("tsyringe");

var _eErrors = require("../../permissions/utils/enums/e-errors");

var _AppError = require("../../../shared/errors/AppError");

var _PermissionsRepositoryMethods = require("../../permissions/repositories/PermissionsRepositoryMethods");

var _AccessProfilesRepositoryMethods = require("../repositories/AccessProfilesRepositoryMethods");

var _eErrors2 = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateAccessProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods, typeof _PermissionsRepositoryMethods.PermissionsRepositoryMethods === "undefined" ? Object : _PermissionsRepositoryMethods.PermissionsRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateAccessProfileService {
  constructor(accessProfilesRepository, permissionsRepository) {
    this.accessProfilesRepository = accessProfilesRepository;
    this.permissionsRepository = permissionsRepository;
  }

  async execute(accessProfileData) {
    const {
      name,
      permissionsId
    } = accessProfileData;
    if (name.length < 3) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooShort);
    if (name.length > 35) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooLong);
    if (!permissionsId) throw new _AppError.AppError(_eErrors.EPermissionError.IdIsRequired);
    const ids = permissionsId.split(',');
    const permissions = await this.permissionsRepository.findByIds(ids);
    if (!permissions) throw new _AppError.AppError(_eErrors.EPermissionError.NotFound);
    const accessProfileExists = await this.accessProfilesRepository.findOne({
      name
    });
    if (accessProfileExists) throw new _AppError.AppError(_eErrors2.EAccessProfileError.AlreadyExist);
    const accessProfile = await this.accessProfilesRepository.create({ ...accessProfileData,
      permissions
    });
    return accessProfile;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateAccessProfileService = CreateAccessProfileService;