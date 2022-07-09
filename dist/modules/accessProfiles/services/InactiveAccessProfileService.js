"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InactiveAccessProfileService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eStatus = require("../utils/enums/e-status");

var _AccessProfilesRepositoryMethods = require("../repositories/AccessProfilesRepositoryMethods");

var _eErrors = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _class;

let InactiveAccessProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class InactiveAccessProfileService {
  constructor(accessProfilesRepository) {
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async execute({
    ids,
    updatedById,
    updatedByName
  }) {
    const accessProfilesIds = ids.split(',');
    const accessProfiles = await this.accessProfilesRepository.findByIds(accessProfilesIds);
    if (!accessProfiles) throw new _AppError.AppError(_eErrors.EAccessProfileError.NotFound);
    if (accessProfiles.some(accessProfile => accessProfile.status === _eStatus.EAccessProfileStatus.Inactive)) throw new _AppError.AppError(_eErrors.EAccessProfileError.AlreadyInactive);
    accessProfiles.forEach(accessProfile => {
      accessProfile.status = _eStatus.EAccessProfileStatus.Inactive;
      accessProfile.updatedById = updatedById;
      accessProfile.updatedByName = updatedByName;
    });
    await this.accessProfilesRepository.update(accessProfiles);
  }

}) || _class) || _class) || _class) || _class);
exports.InactiveAccessProfileService = InactiveAccessProfileService;