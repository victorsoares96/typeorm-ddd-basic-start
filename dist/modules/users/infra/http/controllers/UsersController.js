"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = require("../../../services/CreateUserService");

var _eUser = require("../../../utils/enums/e-user");

var _InactiveUserService = require("../../../services/InactiveUserService");

var _RecoverUserService = require("../../../services/RecoverUserService");

var _SoftRemoveUserService = require("../../../services/SoftRemoveUserService");

var _RemoveUserService = require("../../../services/RemoveUserService");

var _UpdateUserService = require("../../../services/UpdateUserService");

var _UpdateUserAvatarService = require("../../../services/UpdateUserAvatarService");

var _AppError = require("../../../../../shared/errors/AppError");

var _eErrors = require("../../../../../shared/utils/enums/e-errors");

var _ResetUserPasswordService = require("../../../services/ResetUserPasswordService");

var _FindManyUserService = require("../../../services/FindManyUserService");

/* eslint-disable @typescript-eslint/ban-ts-comment */
class UsersController {
  async create(request, response) {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      avatar,
      accessProfileId
    } = request.body;
    const {
      name,
      id
    } = request.user;

    const createUser = _tsyringe.container.resolve(_CreateUserService.CreateUserService);

    const user = await createUser.execute({
      firstName,
      lastName,
      username,
      email,
      password,
      status: _eUser.EUserStatus.Active,
      avatar,
      accessProfileId,
      createdById: id,
      createdByName: name,
      updatedById: id,
      updatedByName: name,
      lastAccess: ''
    });
    return response.json(user);
  }

  async index(request, response) {
    const filters = request.body;

    const findUsers = _tsyringe.container.resolve(_FindManyUserService.FindManyUserService);

    const users = await findUsers.execute(filters);
    return response.json(users);
  }

  async inactive(request, response) {
    const {
      ids
    } = request.body;
    const {
      id: userId,
      name: userName
    } = request.user;

    const inactiveUsers = _tsyringe.container.resolve(_InactiveUserService.InactiveUserService);

    await inactiveUsers.execute({
      ids,
      updatedById: userId,
      updatedByName: userName
    });
    return response.send();
  }

  async recover(request, response) {
    const {
      ids
    } = request.body;
    const {
      id: userId,
      name: userName
    } = request.user;

    const recoverUsers = _tsyringe.container.resolve(_RecoverUserService.RecoverUserService);

    await recoverUsers.execute({
      ids,
      updatedById: userId,
      updatedByName: userName
    });
    return response.send();
  }

  async remove(request, response) {
    const {
      ids
    } = request.body;

    const removeUsers = _tsyringe.container.resolve(_RemoveUserService.RemoveUserService);

    await removeUsers.execute({
      ids
    });
    return response.send();
  }

  async softRemove(request, response) {
    const {
      ids
    } = request.body;

    const softRemoveUsers = _tsyringe.container.resolve(_SoftRemoveUserService.SoftRemoveUserService);

    await softRemoveUsers.execute({
      ids
    });
    return response.send();
  }

  async update(request, response) {
    const {
      id: userId,
      name: userName
    } = request.user;
    const {
      id,
      firstName,
      lastName,
      email,
      username,
      accessProfileId
    } = request.body;

    const updateUser = _tsyringe.container.resolve(_UpdateUserService.UpdateUserService);

    const user = await updateUser.execute({
      id,
      firstName,
      lastName,
      email,
      username,
      accessProfileId,
      updatedById: userId,
      updatedByName: userName
    });
    return response.json(user);
  }

  async updateAvatar(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.UpdateUserAvatarService);

    if (!request.file?.filename) throw new _AppError.AppError(_eErrors.EGenericError.AvatarFilenameRequired, 401);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    }); // @ts-ignore

    delete user.password;
    return response.json(user);
  }

  async resetPassword(request, response) {
    const {
      id,
      currentPassword,
      newPassword
    } = request.body;

    const resetPassword = _tsyringe.container.resolve(_ResetUserPasswordService.ResetUserPasswordService);

    await resetPassword.execute({
      id,
      currentPassword,
      newPassword
    });
    return response.send();
  }

}

exports.UsersController = UsersController;