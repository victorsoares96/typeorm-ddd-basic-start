"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessProfilesRouter = void 0;

var _express = require("express");

var _AccessProfilesController = require("../controllers/AccessProfilesController");

var _ensureAuthorized = require("../../../../../shared/infra/http/middlewares/ensureAuthorized");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _eAccessPermissions = require("../../../utils/enums/e-access-permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accessProfilesRouter = (0, _express.Router)();
exports.accessProfilesRouter = accessProfilesRouter;
const accessProfilesController = new _AccessProfilesController.AccessProfilesController();
accessProfilesRouter.use(_ensureAuthenticated.default);
accessProfilesRouter.get('/accessProfiles', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_VIEW_ACCESS_PROFILES]), accessProfilesController.index);
accessProfilesRouter.post('/accessProfiles', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_CREATE_ACCESS_PROFILE]), accessProfilesController.create);
accessProfilesRouter.put('/accessProfiles', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_UPDATE_ACCESS_PROFILE]), accessProfilesController.update);
accessProfilesRouter.delete('/accessProfiles/softRemove', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_SOFT_REMOVE_ACCESS_PROFILE]), accessProfilesController.softRemove);
accessProfilesRouter.delete('/accessProfiles/remove', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_REMOVE_ACCESS_PROFILE]), accessProfilesController.remove);
accessProfilesRouter.patch('/accessProfiles/recover', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_RECOVER_ACCESS_PROFILE]), accessProfilesController.recover);
accessProfilesRouter.patch('/accessProfiles/inactive', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_INACTIVE_ACCESS_PROFILE]), accessProfilesController.inactive);