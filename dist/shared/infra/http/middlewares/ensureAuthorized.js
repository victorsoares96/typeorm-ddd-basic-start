"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = is;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _AppError = require("../../../errors/AppError");

var _UsersRepositoryMethods = require("../../../../modules/users/repositories/UsersRepositoryMethods");

var _AccessProfilesRepositoryMethods = require("../../../../modules/accessProfiles/repositories/AccessProfilesRepositoryMethods");

var _eErrors = require("../../../../modules/users/utils/enums/e-errors");

var _eErrors2 = require("../../../../modules/accessProfiles/utils/enums/e-errors");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Decoder = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class Decoder {
  constructor(usersRepository, accessProfilesRepository) {
    this.usersRepository = usersRepository;
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async getPermissions(request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new _AppError.AppError(_eErrors.ESessionError.MissingJWT, 401);
    const [, token] = authHeader.split(' ');
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub: id
    } = decoded;
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ['accessProfile']
    });
    if (!user) throw new _AppError.AppError(_eErrors.EUserError.NotFound);
    const accessProfile = await this.accessProfilesRepository.findOne({
      where: {
        id: user.accessProfile.id
      },
      relations: ['permissions']
    });
    if (!accessProfile) throw new _AppError.AppError(_eErrors2.EAccessProfileError.NotFound);
    return accessProfile.permissions;
  }

}) || _class) || _class) || _class) || _class) || _class);

function is(routePermissions) {
  const ensureAuthorized = async (request, response, next) => {
    return next();

    const decoder = _tsyringe.container.resolve(Decoder);

    const permissions = await decoder.getPermissions(request);
    const userPermissions = permissions.map(permission => permission.name);
    const isAuthorized = userPermissions.some(userPermission => routePermissions.includes(userPermission));

    if (isAuthorized) {
      return next();
    }

    throw new _AppError.AppError('You do not have permission to perform this action.', 401);
  };

  return ensureAuthorized;
}