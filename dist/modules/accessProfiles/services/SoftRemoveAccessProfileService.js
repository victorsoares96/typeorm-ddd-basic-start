"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftRemoveAccessProfileService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _AccessProfilesRepositoryMethods = require("../repositories/AccessProfilesRepositoryMethods");

var _eErrors = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _class;

let SoftRemoveAccessProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SoftRemoveAccessProfileService {
  constructor(accessProfilesRepository) {
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async execute({
    ids
  }) {
    if (!ids) throw new _AppError.AppError(_eErrors.EAccessProfileError.IdIsRequired);
    const accessProfilesIds = ids.split(',');
    const accessProfiles = await this.accessProfilesRepository.findByIds(accessProfilesIds);
    if (!accessProfiles) throw new _AppError.AppError(_eErrors.EAccessProfileError.NotFound);
    await this.accessProfilesRepository.softRemove(accessProfiles);
  }

}) || _class) || _class) || _class) || _class);
exports.SoftRemoveAccessProfileService = SoftRemoveAccessProfileService;