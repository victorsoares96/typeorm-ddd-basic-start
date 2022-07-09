"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyPermissionService = void 0;

var _tsyringe = require("tsyringe");

var _PermissionsRepositoryMethods = require("../repositories/PermissionsRepositoryMethods");

var _dec, _dec2, _dec3, _dec4, _class;

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */
let FindManyPermissionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _PermissionsRepositoryMethods.PermissionsRepositoryMethods === "undefined" ? Object : _PermissionsRepositoryMethods.PermissionsRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindManyPermissionService {
  constructor(permissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute(filters) {
    const permissions = await this.permissionsRepository.findMany(filters);
    return permissions;
  }

}) || _class) || _class) || _class) || _class);
exports.FindManyPermissionService = FindManyPermissionService;