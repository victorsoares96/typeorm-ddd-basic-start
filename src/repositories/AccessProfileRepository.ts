import { EntityRepository, Repository } from 'typeorm';
import { AccessProfile } from '../models/AccessProfile';

@EntityRepository(AccessProfile)
export class AccessProfileRepository extends Repository<AccessProfile> {
  public async findByName(name: string): Promise<AccessProfile | null> {
    const findAccessProfile = await this.findOne({
      where: { name },
    });

    return findAccessProfile || null;
  }
}
