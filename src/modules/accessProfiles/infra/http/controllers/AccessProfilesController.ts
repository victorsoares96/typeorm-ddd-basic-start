import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateAccessProfileService,
  Request as CreateRequest,
} from '@modules/accessProfiles/services/CreateAccessProfileService';
import {
  FindAccessProfileService,
  Request as FindRequest,
} from '@modules/accessProfiles/services/FindAccessProfileService';
import { InactiveAccessProfileService } from '@modules/accessProfiles/services/InactiveAccessProfileService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const filters = request.body as FindRequest;

    const findAccessProfiles = container.resolve(FindAccessProfileService);
    const permissions = await findAccessProfiles.execute(filters);

    return response.json(permissions);
  }

  public async inactive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;
    const { id: userId, name: userName } = request.user;

    const inactiveAccessProfile = container.resolve(
      InactiveAccessProfileService,
    );

    await inactiveAccessProfile.execute({
      id,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.send();
  }
}
