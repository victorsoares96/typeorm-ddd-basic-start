"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeUsersRepository = void 0;

var _User = require("../../infra/typeorm/entities/User");

var _eUser = require("../../utils/enums/e-user");

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-restricted-syntax */
class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async create(userData) {
    const user = new _User.User();
    Object.assign(user, {
      id: '1',
      status: _eUser.EUserStatus.Active,
      ...userData
    });
    this.users.push(user);
    return user;
  }

  findOne(filters) {
    return new Promise(resolve => {
      const user = this.users.find(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve(user);
    });
  }

  findMany(filters) {
    return new Promise(resolve => {
      const users = this.users.filter(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve([users, users.length]);
    });
  }

  async findByIds(ids) {
    const findUsers = ids.map(id => this.users.find(user => user.id === id));
    if (findUsers.some(el => !el)) return undefined;
    return findUsers;
  }

  async update(data) {
    const users = data;
    users.forEach(user => {
      const index = this.users.findIndex(item => item.id === user.id);
      this.users[index] = user;
    });
    return this.users;
  }

  async recover(data) {
    const users = data;
    users.forEach(user => {
      const index = this.users.findIndex(item => item.id === user.id);
      this.users[index] = { ...this.users[index],
        status: _eUser.EUserStatus.Active
      };
    });
    return this.users;
  }

  async remove(data) {
    const usersId = data.map(user => user.id);
    const users = this.users.filter(user => !usersId.includes(user.id));
    this.users = users;
    return data;
  }

  async softRemove(data) {
    const usersId = data.map(user => user.id);
    const findUsers = this.users.filter(user => usersId.includes(user.id));
    const softRemoveUsers = findUsers.map(user => {
      return { ...user,
        status: _eUser.EUserStatus.Deleted
      };
    });
    this.users = softRemoveUsers;
    return softRemoveUsers;
  }

}

exports.FakeUsersRepository = FakeUsersRepository;