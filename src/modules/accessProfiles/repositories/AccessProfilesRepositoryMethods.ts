import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';
import { UpdateAccessProfileDTO } from '../dtos/UpdateAccessProfileDTO';

export interface AccessProfilesRepositoryMethods {
  create(data: CreateAccessProfileDTO): Promise<AccessProfile>;
  findOne(
    options?: FindOneOptions<AccessProfile>,
  ): Promise<AccessProfile | undefined>;
  findAndCount(
    options?: FindManyOptions<AccessProfile>,
  ): Promise<[AccessProfile[], number]>;
  findByIds(
    ids: any[],
    options?: FindManyOptions<AccessProfile>,
  ): Promise<AccessProfile[] | undefined>;
  findByName(name: string): Promise<AccessProfile | undefined>;
  update(data: UpdateAccessProfileDTO[]): Promise<AccessProfile[]>;
  recover(data: AccessProfile[]): Promise<AccessProfile[]>;
  remove(data: AccessProfile[]): Promise<AccessProfile[]>;
  softRemove(data: AccessProfile[]): Promise<AccessProfile[]>;
}
