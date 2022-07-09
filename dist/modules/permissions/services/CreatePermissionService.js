"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePermissionService = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _PermissionsRepositoryMethods = require("../repositories/PermissionsRepositoryMethods");

var _eErrors = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _class;

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */
let CreatePermissionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _PermissionsRepositoryMethods.PermissionsRepositoryMethods === "undefined" ? Object : _PermissionsRepositoryMethods.PermissionsRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePermissionService {
  constructor(permissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute({
    name
  }) {
    if (!name) throw new _AppError.AppError(_eErrors.EPermissionError.NameRequired);
    if (name.length < 3) throw new _AppError.AppError(_eErrors.EPermissionError.NameTooShort);
    if (name.length > 35) throw new _AppError.AppError(_eErrors.EPermissionError.NameTooLong);
    const permissionExists = await this.permissionsRepository.findOne({
      name
    });
    if (permissionExists) throw new _AppError.AppError(_eErrors.EPermissionError.AlreadyExist);
    const permission = this.permissionsRepository.create({
      name
    });
    return permission;
  }

}) || _class) || _class) || _class) || _class);
exports.CreatePermissionService = CreatePermissionService;