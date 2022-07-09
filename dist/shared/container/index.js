"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tsyringe = void 0;

var _tsyringe = require("tsyringe");

var _PermissionRepository = require("../../modules/permissions/infra/typeorm/repositories/PermissionRepository");

var _AccessProfileRepository = require("../../modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository");

var _UserRepository = require("../../modules/users/infra/typeorm/repositories/UserRepository");

class Tsyringe {
  constructor() {
    _tsyringe.container.registerSingleton('PermissionsRepository', _PermissionRepository.PermissionRepository);

    _tsyringe.container.registerSingleton('AccessProfileRepository', _AccessProfileRepository.AccessProfileRepository);

    _tsyringe.container.registerSingleton('UsersRepository', _UserRepository.UserRepository);
  }

}

exports.Tsyringe = Tsyringe;