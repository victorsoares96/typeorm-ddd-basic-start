import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { PermissionRepository } from '../repositories/PermissionRepository';
import { CreatePermissionService } from '../services/Permission/CreatePermissionService';

export const permissionsRouter = Router();

permissionsRouter.use(ensureAuthenticated);

permissionsRouter.get('/permissions', async (request, response) => {
  const permissionsRepository = getCustomRepository(PermissionRepository);
  const responsibilities = await permissionsRepository.find();

  return response.json(responsibilities);
});

permissionsRouter.post('/permissions', async (request, response) => {
  const { name } = request.body;

  const createPermission = new CreatePermissionService();
  const permission = await createPermission.execute({
    name,
  });

  return response.json(permission);
});
