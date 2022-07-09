"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessProfileRepository = void 0;

var _typeorm = require("typeorm");

var _AccessProfile = require("../entities/AccessProfile");

class AccessProfileRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_AccessProfile.AccessProfile);
  }

  async create({
    name,
    permissions,
    description,
    createdById,
    createdByName,
    updatedById,
    updatedByName
  }) {
    const accessProfile = this.ormRepository.create({
      name,
      description,
      permissions,
      createdById,
      createdByName,
      updatedById,
      updatedByName
    });
    await this.ormRepository.save(accessProfile);
    return accessProfile;
  }

  async findOne(filters) {
    const {
      isDeleted = false
    } = filters;
    const onlyValueFilters = Object.entries(filters).filter(([, value]) => value);
    const query = Object.fromEntries(onlyValueFilters);
    delete query.isDeleted;
    const accessProfile = await this.ormRepository.findOne({
      where: [{ ...query
      }],
      loadEagerRelations: true,
      withDeleted: isDeleted
    });
    return accessProfile;
  }

  async findMany(filters) {
    const {
      name = '',
      description = '',
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20
    } = filters;
    const onlyValueFilters = Object.entries(filters).filter(([, value]) => value);
    const query = Object.fromEntries(onlyValueFilters);
    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;
    const accessProfiles = await this.ormRepository.findAndCount({
      where: [{ ...query,
        name: (0, _typeorm.ILike)(`%${name}%`),
        description: (0, _typeorm.ILike)(`%${description}%`)
      }],
      loadEagerRelations: true,
      withDeleted: isDeleted,
      take: limit,
      skip: offset,
      order: {
        name: isAscending ? 'ASC' : 'DESC'
      }
    });
    return accessProfiles;
  }

  async findByIds(ids, options) {
    const findAccessProfiles = await this.ormRepository.findByIds(ids, {
      withDeleted: options ? options.widthDeleted : false
    });
    if (findAccessProfiles.length === ids.length) return findAccessProfiles;
    return undefined;
  }

  async update(data) {
    const accessProfiles = await this.ormRepository.save(data);
    return accessProfiles;
  }

  async recover(data) {
    const accessProfiles = await this.ormRepository.recover(data);
    return accessProfiles;
  }

  async remove(data) {
    const accessProfiles = await this.ormRepository.remove(data);
    return accessProfiles;
  }

  async softRemove(data) {
    const accessProfiles = await this.ormRepository.softRemove(data);
    return accessProfiles;
  }

}

exports.AccessProfileRepository = AccessProfileRepository;