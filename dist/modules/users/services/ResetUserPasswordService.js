"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetUserPasswordService = void 0;

var _classValidator = require("class-validator");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../utils/enums/e-errors");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _HashProviderMethods = require("../providers/HashProvider/models/HashProviderMethods");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ResetUserPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _HashProviderMethods.HashProviderMethods === "undefined" ? Object : _HashProviderMethods.HashProviderMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ResetUserPasswordService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    id,
    currentPassword,
    newPassword
  }) {
    if (!id) throw new _AppError.AppError(_eErrors.EUserError.IsRequired);
    if (!currentPassword || !newPassword) throw new _AppError.AppError(_eErrors.EUserError.CurrentOrNewPasswordRequired);
    const user = await this.usersRepository.findOne({
      id
    });
    if (!user) throw new _AppError.AppError(_eErrors.EUserError.NotFound);
    const passwordMatched = await this.hashProvider.compareHash(currentPassword, user.password);
    if (!passwordMatched) throw new _AppError.AppError(_eErrors.EUserError.IncorrectPassword, 401);
    const hashPassword = await this.hashProvider.generateHash(newPassword);
    const updatedUser = { ...user,
      password: hashPassword
    };
    const [error] = await (0, _classValidator.validate)(updatedUser, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    await this.usersRepository.update([updatedUser]);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ResetUserPasswordService = ResetUserPasswordService;