"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyUserService = void 0;

var _tsyringe = require("tsyringe");

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
let FindManyUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindManyUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(filters) {
    const users = await this.usersRepository.findMany(filters);
    return users;
  }

}) || _class) || _class) || _class) || _class);
exports.FindManyUserService = FindManyUserService;