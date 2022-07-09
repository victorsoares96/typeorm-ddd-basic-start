"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeAccessProfileRepository = void 0;

var _AccessProfile = require("../../infra/typeorm/entities/AccessProfile");

var _eStatus = require("../../utils/enums/e-status");

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-restricted-syntax */
class FakeAccessProfileRepository {
  constructor() {
    this.accessProfiles = [];
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
    const accessProfile = new _AccessProfile.AccessProfile();
    Object.assign(accessProfile, {
      id: '1',
      name,
      permissions,
      description,
      status: _eStatus.EAccessProfileStatus.Active,
      createdById,
      createdByName,
      updatedById,
      updatedByName
    });
    this.accessProfiles.push(accessProfile);
    return accessProfile;
  }

  findOne(filters) {
    return new Promise(resolve => {
      const accessProfile = this.accessProfiles.find(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve(accessProfile);
    });
  }

  findMany(filters) {
    return new Promise(resolve => {
      const accessProfiles = this.accessProfiles.filter(item => {
        for (const filter in filters) {
          if ( // @ts-ignore
          item[filter] === undefined || // @ts-ignore
          !item[filter].includes(filters[filter])) return false;
        }

        return true;
      });
      resolve([accessProfiles, accessProfiles.length]);
    });
  }

  async findByIds(ids) {
    const findAccessProfiles = ids.map(id => this.accessProfiles.find(accessProfile => accessProfile.id === id));
    if (findAccessProfiles.some(el => !el)) return undefined;
    return findAccessProfiles;
  }

  async update(data) {
    const accessProfiles = data;
    accessProfiles.forEach(accessProfile => {
      const index = this.accessProfiles.findIndex(item => item.id === accessProfile.id);
      this.accessProfiles[index] = accessProfile;
    });
    return this.accessProfiles;
  }

  async recover(data) {
    const accessProfiles = data;
    accessProfiles.forEach(accessProfile => {
      const index = this.accessProfiles.findIndex(item => item.id === accessProfile.id);
      this.accessProfiles[index] = { ...this.accessProfiles[index],
        status: _eStatus.EAccessProfileStatus.Active
      };
    });
    return this.accessProfiles;
  }

  async remove(data) {
    const accessProfilesId = data.map(accessProfile => accessProfile.id);
    const accessProfiles = this.accessProfiles.filter(accessProfile => !accessProfilesId.includes(accessProfile.id));
    this.accessProfiles = accessProfiles;
    return data;
  }

  async softRemove(data) {
    const accessProfilesId = data.map(id => id.id);
    const findAccessProfiles = this.accessProfiles.filter(accessProfile => accessProfilesId.includes(accessProfile.id));
    const softRemoveAccessProfiles = findAccessProfiles.map(accessProfile => {
      return { ...accessProfile,
        status: _eStatus.EAccessProfileStatus.Deleted
      };
    });
    this.accessProfiles = softRemoveAccessProfiles;
    return softRemoveAccessProfiles;
  }

}

exports.FakeAccessProfileRepository = FakeAccessProfileRepository;