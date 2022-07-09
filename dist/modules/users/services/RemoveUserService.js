"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveUserService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../utils/enums/e-errors");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _dec, _dec2, _dec3, _dec4, _class;

let RemoveUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class RemoveUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    ids
  }) {
    if (!ids) {
      throw new _AppError.AppError(_eErrors.EUserError.IdIsRequired);
    }

    const usersId = ids.split(',');
    const users = await this.usersRepository.findByIds(usersId);
    if (!users) throw new _AppError.AppError(_eErrors.EUserError.NotFound);
    await this.usersRepository.remove(users);
  }

}) || _class) || _class) || _class) || _class);
exports.RemoveUserService = RemoveUserService;