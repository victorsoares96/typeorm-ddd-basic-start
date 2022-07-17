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
      status: EAccessProfileStatus.Active,
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
    const findAccessProfiles = ids.map(id =>
      this.accessProfiles.find(accessProfile => accessProfile.id === id),
    );
    if (findAccessProfiles.some(el => !el)) return undefined;
    return findAccessProfiles as AccessProfile[];
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
    const accessProfilesId = data.map(accessProfile => accessProfile.id);
    const accessProfiles = this.accessProfiles.filter(
      accessProfile => !accessProfilesId.includes(accessProfile.id),
    );

    this.accessProfiles = accessProfiles;
    return data;
  }

  public async softRemove(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfilesId = data.map(id => id.id);
    const findAccessProfiles = this.accessProfiles.filter(accessProfile =>
      accessProfilesId.includes(accessProfile.id),
    );
    const softRemoveAccessProfiles = findAccessProfiles.map(accessProfile => {
      return { ...accessProfile, status: EAccessProfileStatus.Deleted };
    });

    this.accessProfiles = softRemoveAccessProfiles;
    return softRemoveAccessProfiles;
  }
}
