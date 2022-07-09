"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionService = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = require("../../../shared/errors/AppError");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _eErrors = require("../utils/enums/e-errors");

var _HashProviderMethods = require("../providers/HashProvider/models/HashProviderMethods");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _HashProviderMethods.HashProviderMethods === "undefined" ? Object : _HashProviderMethods.HashProviderMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SessionService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    username,
    password
  }) {
    const user = await this.usersRepository.findOne({
      username
    });
    if (!user) throw new _AppError.AppError(_eErrors.ESessionError.IncorrectUsernamePasswordCombination, 401);
    const passwordMatched = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatched) throw new _AppError.AppError(_eErrors.ESessionError.IncorrectUsernamePasswordCombination, 401);
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({
      name: user.fullName
    }, secret, {
      subject: String(user.id),
      expiresIn
    });
    user.lastAccess = new Date().toISOString();
    await this.usersRepository.update([user]); // @ts-ignore

    delete user.password;
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.SessionService = SessionService;