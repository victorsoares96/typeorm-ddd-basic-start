"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissionsRouter = void 0;

var _express = require("express");

var _ensureAuthorized = require("../../../../../shared/infra/http/middlewares/ensureAuthorized");

var _PermissionsController = require("../controllers/PermissionsController");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _eAccessPermissions = require("../../../utils/enums/e-access-permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const permissionsRouter = (0, _express.Router)();
exports.permissionsRouter = permissionsRouter;
const permissionsController = new _PermissionsController.PermissionsController();
permissionsRouter.use(_ensureAuthenticated.default);
permissionsRouter.get('/permissions', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_VIEW_PERMISSIONS]), permissionsController.index);
permissionsRouter.post('/permissions', (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_CREATE_PERMISSION]), permissionsController.create);