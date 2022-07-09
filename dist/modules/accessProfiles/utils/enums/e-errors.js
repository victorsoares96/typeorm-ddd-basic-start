"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EAccessProfileError = void 0;
let EAccessProfileError;
exports.EAccessProfileError = EAccessProfileError;

(function (EAccessProfileError) {
  EAccessProfileError["IsRequired"] = "The access profile is required.";
  EAccessProfileError["AlreadyExist"] = "This access profile is already exists.";
  EAccessProfileError["AlreadyInactive"] = "This access profile is already inactive.";
  EAccessProfileError["NameTooShort"] = "The name must be at least 3 characters long.";
  EAccessProfileError["NameTooLong"] = "The name must be at most 35 characters long.";
  EAccessProfileError["NotFound"] = "No access profile was found.";
  EAccessProfileError["NotDisabled"] = "This access profile is not disabled.";
  EAccessProfileError["IdIsRequired"] = "The access profile id is required.";
})(EAccessProfileError || (exports.EAccessProfileError = EAccessProfileError = {}));