"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserService = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../accessProfiles/utils/enums/e-errors");

var _AccessProfilesRepositoryMethods = require("../../accessProfiles/repositories/AccessProfilesRepositoryMethods");

var _UsersRepositoryMethods = require("../repositories/UsersRepositoryMethods");

var _eErrors2 = require("../utils/enums/e-errors");

var _isValidEmail = require("../utils/isValidEmail");

var _isValidPassword = require("../utils/isValidPassword");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AccessProfilesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _UsersRepositoryMethods.UsersRepositoryMethods === "undefined" ? Object : _UsersRepositoryMethods.UsersRepositoryMethods, typeof _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods === "undefined" ? Object : _AccessProfilesRepositoryMethods.AccessProfilesRepositoryMethods]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(usersRepository, accessProfilesRepository) {
    this.usersRepository = usersRepository;
    this.accessProfilesRepository = accessProfilesRepository;
  }

  async execute(data) {
    const {
      accessProfileId,
      firstName,
      lastName,
      username,
      email,
      password
    } = data;
    if (!firstName) throw new _AppError.AppError(_eErrors2.EUserError.FirstNameIsRequired);
    if (!lastName) throw new _AppError.AppError(_eErrors2.EUserError.LastNameIsRequired);
    if (!username) throw new _AppError.AppError(_eErrors2.EUserError.UsernameIsRequired);
    if (!email) throw new _AppError.AppError(_eErrors2.EUserError.EmailIsRequired);

    if (username.length < 5) {
      throw new _AppError.AppError(_eErrors2.EUserError.UsernameTooShort);
    }

    if (username.length > 15) {
      throw new _AppError.AppError(_eErrors2.EUserError.UsernameTooLong);
    }

    if (!(0, _isValidEmail.isValidEmail)(email)) {
      throw new _AppError.AppError(_eErrors2.EUserError.EmailIsInvalid);
    }

    if (!(0, _isValidPassword.isValidPassword)(password)) {
      throw new _AppError.AppError(_eErrors2.EUserError.PasswordMustBeAtLeastEightCharsOneUpperCaseAndOneNumber);
    }

    if (!accessProfileId) throw new _AppError.AppError(_eErrors.EAccessProfileError.IsRequired);
    const accessProfile = await this.accessProfilesRepository.findOne({
      id: accessProfileId
    });
    if (!accessProfile) throw new _AppError.AppError(_eErrors.EAccessProfileError.NotFound);
    const userExists = await this.usersRepository.findOne({
      username
    });
    if (userExists) throw new _AppError.AppError(_eErrors2.EUserError.AlreadyExist);
    const user = this.usersRepository.create({ ...data,
      accessProfile
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserService = CreateUserService;