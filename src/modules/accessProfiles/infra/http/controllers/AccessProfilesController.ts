import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateAccessProfileService,
  Request as CreateRequest,
} from '@modules/accessProfiles/services/CreateAccessProfileService';

export class AccessProfilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, permissionsId, description } = request.body as CreateRequest;

    const createAccessProfile = container.resolve(CreateAccessProfileService);
    const accessProfile = await createAccessProfile.execute({
      name,
      permissionsId,
      description,
    });

    return response.json(accessProfile);
  }

  /* public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const findPermission = container.resolve(FindPermissionService);
    const permissions = await findPermission.execute({ name });

    return response.json(permissions);
  } */
}
