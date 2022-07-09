"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _eAccessPermissions = require("../../../utils/enums/e-access-permissions");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _ensureAuthorized = require("../../../../../shared/infra/http/middlewares/ensureAuthorized");

var _UsersController = require("../controllers/UsersController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
exports.usersRouter = usersRouter;
const usersController = new _UsersController.UsersController();
const upload = (0, _multer.default)(_upload.default);
usersRouter.get('/users', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_VIEW_USER]), usersController.index);
usersRouter.post('/users', _ensureAuthenticated.default, usersController.create);
usersRouter.put('/users', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_UPDATE_USER]), usersController.update);
usersRouter.patch('/users/avatar', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_UPDATE_USER_AVATAR]), upload.single('avatar'), usersController.updateAvatar);
usersRouter.delete('/users/softRemove', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_SOFT_REMOVE_USER]), usersController.softRemove);
usersRouter.delete('/users/remove', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_REMOVE_USER]), usersController.remove);
usersRouter.patch('/users/recover', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_RECOVER_USER]), usersController.recover);
usersRouter.patch('/users/inactive', _ensureAuthenticated.default, (0, _ensureAuthorized.is)([_eAccessPermissions.CAN_RECOVER_USER]), usersController.inactive);
usersRouter.patch('/users/password', usersController.resetPassword);