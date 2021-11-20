import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';
import { AccessProfileDTO } from '../dtos/AccessProfileDTO';
import { FindManyAccessProfileDTO } from '../dtos/FindManyAccessProfileDTO';
import { FindOneAccessProfileDTO } from '../dtos/FindOneAccessProfileDTO';

export interface AccessProfilesRepositoryMethods {
  create(data: CreateAccessProfileDTO): Promise<AccessProfile>;
  findOne(data: FindOneAccessProfileDTO): Promise<AccessProfile | undefined>;
  findMany(data: FindManyAccessProfileDTO): Promise<[AccessProfile[], number]>;
  findByIds(ids: string[]): Promise<AccessProfile[] | undefined>;
  update(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  recover(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  remove(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
  softRemove(data: AccessProfileDTO[]): Promise<AccessProfile[]>;
}
