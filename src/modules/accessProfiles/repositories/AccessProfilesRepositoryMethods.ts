import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';
import { UpdateAccessProfileDTO } from '../dtos/UpdateAccessProfileDTO';
import { RecoverAccessProfileDTO } from '../dtos/RecoverAccessProfileDTO';

export interface AccessProfilesRepositoryMethods {
  create(data: CreateAccessProfileDTO): Promise<AccessProfile>;
  findOne(
    options?: FindOneOptions<AccessProfile>,
  ): Promise<AccessProfile | undefined>;
  findAndCount(
    options?: FindManyOptions<AccessProfile>,
  ): Promise<[AccessProfile[], number]>;
  findByIds(ids: any[], options?: FindManyOptions<AccessProfile>);
  findByName(name: string): Promise<AccessProfile | undefined>;
  update(data: UpdateAccessProfileDTO): Promise<AccessProfile>;
  recover(accessProfiles: RecoverAccessProfileDTO[]): Promise<AccessProfile[]>;
}
