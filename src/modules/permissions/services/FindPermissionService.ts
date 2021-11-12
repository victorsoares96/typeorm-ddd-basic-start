import { injectable, inject } from 'tsyringe';

import { ILike } from 'typeorm';
import { Permission } from '../infra/typeorm/entities/Permission';
import { PermissionsRepositoryMethods } from '../repositories/PermissionsRepositoryMethods';

export interface Request {
  name?: string;
}

@injectable()
export class FindPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute({
    name = '',
  }: Request): Promise<[Permission[], number]> {
    const permissions = await this.permissionsRepository.findAndCount({
      where: [
        {
          name: ILike(`%${name}%`),
        },
      ],
    });

    return permissions;
  }
}
