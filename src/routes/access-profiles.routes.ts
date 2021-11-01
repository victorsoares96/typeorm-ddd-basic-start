import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { is } from '../middlewares/ensureAuthorized';
import {
  CreateAccessProfileService,
  Request as CreateRequest,
} from '../services/AccessProfile/CreateAccessProfileService';
import {
  FindAccessProfileService,
  Request as FindRequest,
} from '../services/AccessProfile/FindAccessProfileService';
import { InactiveAccessProfileService } from '../services/AccessProfile/InactiveAccessProfileService';
import { RecoverAccessProfileService } from '../services/AccessProfile/RecoverAccessProfileService';
import { RemoveAccessProfileService } from '../services/AccessProfile/RemoveAccessProfileService';
import { UpdateAccessProfileService } from '../services/AccessProfile/UpdateAccessProfileService';
import {
  CAN_CREATE_ACCESS_PROFILE,
  CAN_INACTIVE_ACCESS_PROFILE,
  CAN_RECOVER_ACCESS_PROFILE,
  CAN_REMOVE_ACCESS_PROFILE,
  CAN_SOFT_REMOVE_ACCESS_PROFILE,
  CAN_UPDATE_ACCESS_PROFILE,
  CAN_VIEW_ACCESS_PROFILES,
} from '../utils/enums/e-access-permissions';

export const accessProfilesRouter = Router();

accessProfilesRouter.use(ensureAuthenticated);

accessProfilesRouter.get(
  '/accessProfiles',
  is([CAN_VIEW_ACCESS_PROFILES]),
  async (request, response) => {
    const {
      name,
      description,
      status,
      createdAt,
      createdById,
      updatedAt,
      updatedById,
      deletionDate,
      isDeleted,
      offset,
      isAscending,
      limit,
    } = request.body as FindRequest;

    const findAccessProfiles = new FindAccessProfileService();
    const accessProfiles = await findAccessProfiles.execute({
      name,
      description,
      status,
      createdAt,
      createdById,
      updatedAt,
      updatedById,
      deletionDate,
      isDeleted,
      offset,
      isAscending,
      limit,
    });

    return response.json(accessProfiles);
  },
);

accessProfilesRouter.post(
  '/accessProfiles',
  is([CAN_CREATE_ACCESS_PROFILE]),
  async (request, response) => {
    const { name, description, status, permissionsId } =
      request.body as CreateRequest;

    const createAccessProfile = new CreateAccessProfileService();
    const accessProfile = await createAccessProfile.execute({
      name,
      description,
      status,
      permissionsId,
    });

    return response.json(accessProfile);
  },
);

accessProfilesRouter.put(
  '/accessProfiles',
  is([CAN_UPDATE_ACCESS_PROFILE]),
  async (request, response) => {
    const { id, name, status, description, permissionsId } = request.body;
    const { id: userId, name: userName } = request.user;

    const updateAccessProfile = new UpdateAccessProfileService();
    const accessProfile = await updateAccessProfile.execute({
      id,
      name,
      status,
      description,
      permissionsId,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.json(accessProfile);
  },
);

accessProfilesRouter.delete(
  '/accessProfiles/softRemove',
  is([CAN_SOFT_REMOVE_ACCESS_PROFILE]),
  async (request, response) => {
    const { id } = request.body;

    const removeAccessProfile = new RemoveAccessProfileService({
      softRemove: true,
    });

    const accessProfile = await removeAccessProfile.execute({
      id,
    });

    return response.json(accessProfile);
  },
);

accessProfilesRouter.delete(
  '/accessProfiles/remove',
  is([CAN_REMOVE_ACCESS_PROFILE]),
  async (request, response) => {
    const { id } = request.body;
    const removeAccessProfile = new RemoveAccessProfileService();

    const accessProfile = await removeAccessProfile.execute({
      id,
    });

    return response.json(accessProfile);
  },
);

accessProfilesRouter.patch(
  '/accessProfiles/recover',
  is([CAN_RECOVER_ACCESS_PROFILE]),
  async (request, response) => {
    const { id } = request.body;
    const { id: userId, name: userName } = request.user;

    const recoverAccessProfile = new RecoverAccessProfileService();

    await recoverAccessProfile.execute({
      id,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.send();
  },
);

accessProfilesRouter.patch(
  '/accessProfiles/inactive',
  is([CAN_INACTIVE_ACCESS_PROFILE]),
  async (request, response) => {
    const { id } = request.body;
    const { id: userId, name: userName } = request.user;

    const inactiveAccessProfile = new InactiveAccessProfileService();

    await inactiveAccessProfile.execute({
      id,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.send();
  },
);
