import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';
import { AccessProfileDTO } from '../dtos/AccessProfileDTO';

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
  update(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  recover(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  remove(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  softRemove(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
}
