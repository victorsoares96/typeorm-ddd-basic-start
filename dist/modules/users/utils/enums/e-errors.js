"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EUserError = exports.ESessionError = void 0;
let EUserError;
exports.EUserError = EUserError;

(function (EUserError) {
  EUserError["NotFound"] = "No user was found.";
  EUserError["SomeNotFound"] = "Some of these users were not found.";
  EUserError["OnlyAuthenticateCanChangeAvatar"] = "Only authenticated users can be change avatar.";
  EUserError["AlreadyExist"] = "This user is already exists.";
  EUserError["AlreadyInactive"] = "This user is already inactive.";
  EUserError["NotDisabled"] = "This user is not disabled.";
  EUserError["IsRequired"] = "The user is required.";
  EUserError["IdIsRequired"] = "The user id is required.";
  EUserError["CurrentOrNewPasswordRequired"] = "The current password/new password is required.";
  EUserError["IncorrectPassword"] = "The password is incorrect.";
  EUserError["SomeAlreadyInactive"] = "Some or some users are already inactive.";
  EUserError["FirstNameIsRequired"] = "First name is required.";
  EUserError["LastNameIsRequired"] = "Last name is required.";
  EUserError["UsernameTooShort"] = "The username must be at least 5 characters long.";
  EUserError["UsernameTooLong"] = "The username must be at most 15 characters long.";
  EUserError["UsernameIsRequired"] = "Username is required.";
  EUserError["EmailIsRequired"] = "Email is required.";
  EUserError["EmailIsInvalid"] = "Email is invalid.";
  EUserError["PasswordMustBeAtLeastEightCharsOneUpperCaseAndOneNumber"] = "Password must be at least 8 characters, 1 upper case, 1 number.";
})(EUserError || (exports.EUserError = EUserError = {}));

let ESessionError;
exports.ESessionError = ESessionError;

(function (ESessionError) {
  ESessionError["IncorrectUsernamePasswordCombination"] = "Incorrect username/password combination.";
  ESessionError["InvalidJWT"] = "Invalid JWT token.";
  ESessionError["MissingJWT"] = "JWT token is missing.";
})(ESessionError || (exports.ESessionError = ESessionError = {}));