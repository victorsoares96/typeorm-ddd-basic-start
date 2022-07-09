"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PermissionRepository = void 0;

var _typeorm = require("typeorm");

var _classValidator = require("class-validator");

var _AppError = require("../../../../../shared/errors/AppError");

var _Permission = require("../entities/Permission");

class PermissionRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Permission.Permission);
  }

  async create({
    name
  }) {
    const permission = this.ormRepository.create({
      name
    });
    const [error] = await (0, _classValidator.validate)(permission, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    await this.ormRepository.save(permission);
    return permission;
  }

  async findOne(filters) {
    const onlyValueFilters = Object.entries(filters).filter(([, value]) => value);
    const query = Object.fromEntries(onlyValueFilters);
    const permission = await this.ormRepository.findOne({
      where: [{ ...query
      }]
    });
    return permission;
  }

  async findMany(filters) {
    const {
      name = ''
    } = filters;
    const onlyValueFilters = Object.entries(filters).filter(([, value]) => value);
    const query = Object.fromEntries(onlyValueFilters);
    const accessProfiles = await this.ormRepository.findAndCount({
      where: [{ ...query,
        name: (0, _typeorm.ILike)(`%${name}%`)
      }]
    });
    return accessProfiles;
  }

  async findByIds(ids) {
    const findPermissions = await this.ormRepository.findByIds(ids);
    if (findPermissions.length === ids.length) return findPermissions;
    return undefined;
  }

}

exports.PermissionRepository = PermissionRepository;