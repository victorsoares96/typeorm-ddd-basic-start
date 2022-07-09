"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

var _classValidator = require("class-validator");

var _AppError = require("../../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _class;

let UserRepository = (_dec = (0, _typeorm.EntityRepository)(_User.User), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class UserRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.User);
  }

  async create(data) {
    const user = this.ormRepository.create(data);
    const [error] = await (0, _classValidator.validate)(user, {
      stopAtFirstError: true
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new _AppError.AppError(message);
    }

    await this.ormRepository.save(user);
    return user;
  }

  async findOne(filters) {
    const {
      isDeleted = false
    } = filters;
    const onlyValueFilters = Object.entries(filters).filter(([, value]) => value);
    const query = Object.fromEntries(onlyValueFilters);
    delete query.isDeleted;
    const user = await this.ormRepository.findOne({
      where: [{ ...query
      }],
      loadEagerRelations: true,
      withDeleted: isDeleted
    });
    return user;
  }

  async findMany(filters) {
    const {
      firstName = '',
      lastName = '',
      fullName = '',
      email = '',
      username = '',
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
    const users = await this.ormRepository.findAndCount({
      where: [{ ...query,
        firstName: (0, _typeorm.ILike)(`%${firstName}%`),
        lastName: (0, _typeorm.ILike)(`%${lastName}%`),
        fullName: (0, _typeorm.ILike)(`%${fullName}%`),
        email: (0, _typeorm.ILike)(`%${email}%`),
        username: (0, _typeorm.ILike)(`%${username}%`)
      }],
      loadEagerRelations: true,
      withDeleted: isDeleted,
      take: limit,
      skip: offset,
      order: {
        createdAt: isAscending ? 'ASC' : 'DESC'
      }
    });
    return users;
  }

  async findByIds(ids, options) {
    const findUsers = await this.ormRepository.findByIds(ids, {
      withDeleted: options ? options.withDeleted : false
    });
    if (findUsers.length === ids.length) return findUsers;
    return undefined;
  }

  async update(data) {
    const users = await this.ormRepository.save(data);
    return users;
  }

  async recover(data) {
    const users = await this.ormRepository.recover(data);
    return users;
  }

  async remove(data) {
    const users = await this.ormRepository.remove(data);
    return users;
  }

  async softRemove(data) {
    const users = await this.ormRepository.softRemove(data);
    return users;
  }

}) || _class) || _class) || _class);
exports.UserRepository = UserRepository;