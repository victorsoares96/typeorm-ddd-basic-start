import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { FindManyPermissionService } from '@modules/permissions/services/FindManyPermissionService';

export class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createPermission = container.resolve(CreatePermissionService);
    const permission = await createPermission.execute({
      name,
    });

    return response.json(permission);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const findPermission = container.resolve(FindManyPermissionService);
    const permissions = await findPermission.execute({ name });

    return response.json(permissions);
  }
}
