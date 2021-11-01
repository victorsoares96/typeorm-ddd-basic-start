import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '../models/Permission';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  public async findByName(name: string): Promise<Permission | null> {
    const findPermission = await this.findOne({
      where: { name },
    });

    return findPermission || null;
  }
}
