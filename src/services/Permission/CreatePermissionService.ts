import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { Permission } from '../../models/Permission';
import { PermissionRepository } from '../../repositories/PermissionRepository';
import { EPermissionError } from '../../utils/enums/e-errors';

export interface Request {
  name: string;
  createdById?: string;
  createdByName?: string;
}

export class CreatePermissionService {
  public async execute({ name }: Request): Promise<Permission> {
    const permissionsRepository = getCustomRepository(PermissionRepository);

    const permissionWithSameName = await permissionsRepository.findByName(name);

    if (permissionWithSameName)
      throw new AppError(EPermissionError.AlreadyExist);

    const permission = permissionsRepository.create({
      name,
    });

    const [error] = await validate(permission, {
      stopAtFirstError: true,
    });
    if (error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await permissionsRepository.save(permission);

    return permission;
  }
}
