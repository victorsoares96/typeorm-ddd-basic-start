/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { CreateAccessProfileDTO } from '@modules/accessProfiles/dtos/CreateAccessProfileDTO';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { FindOneAccessProfileDTO } from '@modules/accessProfiles/dtos/FindOneAccessProfileDTO';
import { AccessProfileDTO } from '@modules/accessProfiles/dtos/AccessProfileDTO';
import { EAccessProfileStatus } from '@modules/accessProfiles/utils/enums/e-status';
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';

export class FakeAccessProfileRepository
  implements AccessProfilesRepositoryMethods
{
  private accessProfiles: AccessProfile[] = [];

  public async create({
    name,
    permissions,
    description,
    createdById,
    createdByName,
    updatedById,
    updatedByName,
  }: CreateAccessProfileDTO): Promise<AccessProfile> {
    const accessProfile = new AccessProfile();

    Object.assign(accessProfile, {
      id: '1',
      name,
      permissions,
      description,
      createdById,
      createdByName,
      updatedById,
      updatedByName,
    });

    this.accessProfiles.push(accessProfile);

    return accessProfile;
  }

  public findOne(
    filters: FindOneAccessProfileDTO,
  ): Promise<AccessProfile | undefined> {
    return new Promise(resolve => {
      const accessProfile = this.accessProfiles.find(item => {
        for (const filter in filters) {
          if (
            // @ts-ignore
            item[filter] === undefined ||
            // @ts-ignore
            !item[filter].includes(filters[filter])
          )
            return false;
        }
        return true;
      });

      resolve(accessProfile);
    });
  }

  public findMany(
    filters: FindManyAccessProfileDTO,
  ): Promise<[AccessProfile[], number]> {
    return new Promise(resolve => {
      const accessProfiles = this.accessProfiles.filter(item => {
        for (const filter in filters) {
          if (
            // @ts-ignore
            item[filter] === undefined ||
            // @ts-ignore
            !item[filter].includes(filters[filter])
          )
            return false;
        }
        return true;
      });

      resolve([accessProfiles, accessProfiles.length]);
    });
  }

  public async findByIds(ids: string[]): Promise<AccessProfile[] | undefined> {
    const findPermissions = this.accessProfiles.filter(accessProfile =>
      ids.includes(accessProfile.id),
    );

    return findPermissions;
  }

  public async update(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = data;

    accessProfiles.forEach(accessProfile => {
      const index = this.accessProfiles.findIndex(
        item => item.id === accessProfile.id,
      );

      this.accessProfiles[index] = accessProfile;
    });

    return this.accessProfiles;
  }

  public async recover(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = data;

    accessProfiles.forEach(accessProfile => {
      const index = this.accessProfiles.findIndex(
        item => item.id === accessProfile.id,
      );

      this.accessProfiles[index] = {
        ...this.accessProfiles[index],
        status: EAccessProfileStatus.Active,
      };
    });

    return this.accessProfiles;
  }

  public async remove(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = data;
    return accessProfiles;
  }

  public async softRemove(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = data;

    accessProfiles.forEach(accessProfile => {
      const index = this.accessProfiles.findIndex(
        item => item.id === accessProfile.id,
      );

      this.accessProfiles[index] = {
        ...this.accessProfiles[index],
        status: EAccessProfileStatus.Inactive,
      };
    });

    return this.accessProfiles;
  }
}
