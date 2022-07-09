"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessProfilesController = void 0;

var _tsyringe = require("tsyringe");

var _CreateAccessProfileService = require("../../../services/CreateAccessProfileService");

var _FindManyAccessProfileService = require("../../../services/FindManyAccessProfileService");

var _InactiveAccessProfileService = require("../../../services/InactiveAccessProfileService");

var _RecoverAccessProfileService = require("../../../services/RecoverAccessProfileService");

var _RemoveAccessProfileService = require("../../../services/RemoveAccessProfileService");

var _SoftRemoveAccessProfileService = require("../../../services/SoftRemoveAccessProfileService");

var _UpdateAccessProfileService = require("../../../services/UpdateAccessProfileService");

class AccessProfilesController {
  async create(request, response) {
    const {
      name,
      permissionsId,
      description,
      createdById,
      createdByName,
      updatedById,
      updatedByName
    } = request.body;

    const createAccessProfile = _tsyringe.container.resolve(_CreateAccessProfileService.CreateAccessProfileService);

    const accessProfile = await createAccessProfile.execute({
      name,
      permissionsId,
      description,
      createdById,
      createdByName,
      updatedById,
      updatedByName
    });
    return response.json(accessProfile);
  }

  async index(request, response) {
    const filters = request.body;

    const findAccessProfiles = _tsyringe.container.resolve(_FindManyAccessProfileService.FindManyAccessProfileService);

    const permissions = await findAccessProfiles.execute(filters);
    return response.json(permissions);
  }

  async inactive(request, response) {
    const {
      ids
    } = request.body;
    const {
      id: userId,
      name: userName
    } = request.user;

    const inactiveAccessProfile = _tsyringe.container.resolve(_InactiveAccessProfileService.InactiveAccessProfileService);

    await inactiveAccessProfile.execute({
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

    const recoverAccessProfiles = _tsyringe.container.resolve(_RecoverAccessProfileService.RecoverAccessProfileService);

    await recoverAccessProfiles.execute({
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

    const removeAccessProfiles = _tsyringe.container.resolve(_RemoveAccessProfileService.RemoveAccessProfileService);

    await removeAccessProfiles.execute({
      ids
    });
    return response.send();
  }

  async softRemove(request, response) {
    const {
      ids
    } = request.body;

    const softRemoveAccessProfiles = _tsyringe.container.resolve(_SoftRemoveAccessProfileService.SoftRemoveAccessProfileService);

    await softRemoveAccessProfiles.execute({
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
      name,
      permissionsId,
      description
    } = request.body;

    const updateAccessProfile = _tsyringe.container.resolve(_UpdateAccessProfileService.UpdateAccessProfileService);

    const accessProfile = await updateAccessProfile.execute({
      id,
      name,
      permissionsId,
      description,
      updatedById: userId,
      updatedByName: userName
    });
    return response.json(accessProfile);
  }

}

exports.AccessProfilesController = AccessProfilesController;