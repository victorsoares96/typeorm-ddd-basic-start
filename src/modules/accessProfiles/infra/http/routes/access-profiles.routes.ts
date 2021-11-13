import { Router } from 'express';

import {
  CAN_CREATE_ACCESS_PROFILE,
  CAN_INACTIVE_ACCESS_PROFILE,
  CAN_RECOVER_ACCESS_PROFILE,
  CAN_REMOVE_ACCESS_PROFILE,
  CAN_SOFT_REMOVE_ACCESS_PROFILE,
  CAN_UPDATE_ACCESS_PROFILE,
  CAN_VIEW_ACCESS_PROFILES,
} from '@shared/utils/enums/e-access-permissions';
import { AccessProfilesController } from '@modules/accessProfiles/infra/http/controllers/AccessProfilesController';
import { is } from '@shared/infra/http/middlewares/ensureAuthorized';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const accessProfilesRouter = Router();
const accessProfilesController = new AccessProfilesController();

accessProfilesRouter.use(ensureAuthenticated);

accessProfilesRouter.get(
  '/accessProfiles',
  is([CAN_VIEW_ACCESS_PROFILES]),
  accessProfilesController.index,
);

accessProfilesRouter.post(
  '/accessProfiles',
  is([CAN_CREATE_ACCESS_PROFILE]),
  accessProfilesController.create,
);

accessProfilesRouter.put(
  '/accessProfiles',
  is([CAN_UPDATE_ACCESS_PROFILE]),
  accessProfilesController.update,
);

accessProfilesRouter.delete(
  '/accessProfiles/softRemove',
  is([CAN_SOFT_REMOVE_ACCESS_PROFILE]),
  accessProfilesController.softRemove,
);

accessProfilesRouter.delete(
  '/accessProfiles/remove',
  is([CAN_REMOVE_ACCESS_PROFILE]),
  accessProfilesController.remove,
);

accessProfilesRouter.patch(
  '/accessProfiles/recover',
  is([CAN_RECOVER_ACCESS_PROFILE]),
  accessProfilesController.recover,
);

accessProfilesRouter.patch(
  '/accessProfiles/inactive',
  is([CAN_INACTIVE_ACCESS_PROFILE]),
  accessProfilesController.inactive,
);
