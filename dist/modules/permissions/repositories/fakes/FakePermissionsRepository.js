"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakePermissionsRepository = void 0;

var _classValidator = require("class-validator");

var _AppError = require("../../../../shared/errors/AppError");

var _Permission = require("../../infra/typeorm/entities/Permission");

/* eslint-disable no-restricted-syntax */

/* eslint-disable @typescript-eslint/ban-ts-comment */
class FakePermissionsRepository {
  constructor() {
    this.permissions = [];
  }

  async create({
    name
  }) {
    const permission = new _Permission.Permission();
    Object.assign(permission, {
      id: '1',
      name
    });
    const [error] = await (0, _classValidator.validate)(permission, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    this.permissions.push(permission);
    return permission;
  }

  findOne(filters) {
    return new Promise(resolve => {
      const permission = this.permissions.find(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve(permission);
    });
  }

  findMany(filters) {
    return new Promise(resolve => {
      const permissions = this.permissions.filter(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve([permissions, permissions.length]);
    });
  }

  async findByIds(ids) {
    const findPermissions = ids.map(id => this.permissions.find(permission => permission.id === id));
    if (findPermissions.some(el => !el)) return undefined;
    return findPermissions;
  }

}

exports.FakePermissionsRepository = FakePermissionsRepository;