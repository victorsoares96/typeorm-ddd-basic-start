"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EPermissionError = void 0;
let EPermissionError;
exports.EPermissionError = EPermissionError;

(function (EPermissionError) {
  EPermissionError["NameRequired"] = "The permission name is required.";
  EPermissionError["NameTooShort"] = "The permission name must be at least 3 characters long.";
  EPermissionError["NameTooLong"] = "The permission name must be at most 35 characters long.";
  EPermissionError["IsRequired"] = "The permission is required.";
  EPermissionError["NotFound"] = "No permissions was found.";
  EPermissionError["SomeNotFound"] = "Some of these responsibilities were not found.";
  EPermissionError["AlreadyExist"] = "This permission is already exists.";
  EPermissionError["IdIsRequired"] = "The permission id is required.";
})(EPermissionError || (exports.EPermissionError = EPermissionError = {}));