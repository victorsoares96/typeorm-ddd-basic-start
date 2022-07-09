"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../utils/enums/e-errors");

var _StorageProviderMethods = require("../../../shared/container/providers/StorageProvider/models/StorageProviderMethods");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _StorageProviderMethods.StorageProviderMethods === "undefined" ? Object : _StorageProviderMethods.StorageProviderMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarService {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    userId,
    avatarFilename
  }) {
    const user = await this.usersRepository.findOne({
      id: userId
    });
    if (!user) throw new _AppError.AppError(_eErrors.EUserError.NotFound);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = fileName;
    await this.usersRepository.update([user]);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarService = UpdateUserAvatarService;