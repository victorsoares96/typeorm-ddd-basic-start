import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { CreateAccessProfileDTO } from '../dtos/CreateAccessProfileDTO';

export interface AccessProfilesRepositoryMethods {
  create(data: CreateAccessProfileDTO): Promise<AccessProfile>;
  findByName(name: string): Promise<AccessProfile | undefined>;
}
