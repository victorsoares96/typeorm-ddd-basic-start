"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecoverUserService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eUser = require("../utils/enums/e-user");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _eErrors = require("../utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _class;

let RecoverUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class RecoverUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    ids,
    updatedById,
    updatedByName
  }) {
    const usersId = ids.split(',');
    const users = await this.usersRepository.findByIds(usersId, {
      withDeleted: true
    });
    if (!users) throw new _AppError.AppError(_eErrors.EUserError.SomeNotFound);
    users.forEach(user => {
      user.status = _eUser.EUserStatus.Active;
      user.updatedById = updatedById;
      user.updatedByName = updatedByName;
    });
    await this.usersRepository.update(users);
    await this.usersRepository.recover(users);
  }

}) || _class) || _class) || _class) || _class);
exports.RecoverUserService = RecoverUserService;