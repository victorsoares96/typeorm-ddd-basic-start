"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyAccessProfileService = void 0;

var _tsyringe = require("tsyringe");

var _AccessProfilesRepositoryMethods = require("../repositories/AccessProfilesRepositoryMethods");

var _dec, _dec2, _dec3, _dec4, _class;

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */
let FindManyAccessProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindManyAccessProfileService {
  constructor(accessProfilesRepository) {
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async execute(filters) {
    const accessProfiles = await this.accessProfilesRepository.findMany(filters);
    return accessProfiles;
  }

}) || _class) || _class) || _class) || _class);
exports.FindManyAccessProfileService = FindManyAccessProfileService;