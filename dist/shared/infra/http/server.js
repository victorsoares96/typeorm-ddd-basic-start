"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _tsyringe = require("tsyringe");

require("express-async-errors");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _PermissionRepository = require("../../../modules/permissions/infra/typeorm/repositories/PermissionRepository");

var _AccessProfileRepository = require("../../../modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository");

var _UserRepository = require("../../../modules/users/infra/typeorm/repositories/UserRepository");

var _sessions = require("../../../modules/users/infra/http/routes/sessions.routes");

var _users = require("../../../modules/users/infra/http/routes/users.routes");

var _accessProfiles = require("../../../modules/accessProfiles/infra/http/routes/access-profiles.routes");

var _permissions = require("../../../modules/permissions/infra/http/routes/permissions.routes");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.express = void 0;
    this.connection = void 0;
    this.express = (0, _express.default)();
    this.express.use(_express.default.json());
    this.connection = (0, _typeorm.default)();
    this.database();
    this.routes();
    this.middlewares();
  }

  middlewares() {
    this.express.use(_errorHandler.default);
  }

  tsyringe() {
    _tsyringe.container.registerSingleton('PermissionsRepository', _PermissionRepository.PermissionRepository);

    _tsyringe.container.registerSingleton('AccessProfilesRepository', _AccessProfileRepository.AccessProfileRepository);

    _tsyringe.container.registerSingleton('UsersRepository', _UserRepository.UserRepository);
  }

  database() {
    this.connection.then(() => {
      console.log(`📦  Connected to ${process.env.DATABASE}!`);
      this.startServer();
      this.tsyringe();
    }).catch(error => {
      console.log('❌  Error when initializing the database.');
      console.error(error);
    });
  }

  startServer() {
    this.express.listen(3333, () => {
      console.log('🚀  Server started on port 3333');
    });
  }

  routes() {
    this.express.use('/files', _express.default.static(_upload.default.uploadsFolder));
    this.express.use(_sessions.sessionsRouter);
    this.express.use(_users.usersRouter);
    this.express.use(_accessProfiles.accessProfilesRouter);
    this.express.use(_permissions.permissionsRouter);
  }

}

var _default = new App().express;
exports.default = _default;