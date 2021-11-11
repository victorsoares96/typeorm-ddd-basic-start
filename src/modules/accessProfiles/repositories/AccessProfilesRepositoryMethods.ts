import { FindOneOptions } from 'typeorm';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';

export interface AccessProfilesRepositoryMethods {
  create(data: CreateAccessProfileDTO): Promise<AccessProfile>;
  findOne(
    options?: FindOneOptions<AccessProfile>,
  ): Promise<AccessProfile | undefined>;
  findByName(name: string): Promise<AccessProfile | undefined>;
}
