"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PermissionsController = void 0;

var _tsyringe = require("tsyringe");

var _CreatePermissionService = require("../../../services/CreatePermissionService");

var _FindManyPermissionService = require("../../../services/FindManyPermissionService");

class PermissionsController {
  async create(request, response) {
    const {
      name
    } = request.body;

    const createPermission = _tsyringe.container.resolve(_CreatePermissionService.CreatePermissionService);

    const permission = await createPermission.execute({
      name
    });
    return response.json(permission);
  }

  async index(request, response) {
    const {
      name
    } = request.body;

    const findPermission = _tsyringe.container.resolve(_FindManyPermissionService.FindManyPermissionService);

    const permissions = await findPermission.execute({
      name
    });
    return response.json(permissions);
  }

}

exports.PermissionsController = PermissionsController;