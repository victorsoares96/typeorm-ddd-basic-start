"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindOneUserService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../../shared/utils/enums/e-errors");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _dec, _dec2, _dec3, _dec4, _class;

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */
let FindOneUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindOneUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(filters) {
    if (Object.keys(filters).length === 0 || Object.values(filters).some(value => !value)) throw new _AppError.AppError(_eErrors.EGenericError.MissingFilters);
    const user = await this.usersRepository.findOne(filters);
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.FindOneUserService = FindOneUserService;