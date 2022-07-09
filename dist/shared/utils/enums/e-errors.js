"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EGenericError = void 0;
let EGenericError;
exports.EGenericError = EGenericError;

(function (EGenericError) {
  EGenericError["AvatarFilenameRequired"] = "The avatar filename is required.";
  EGenericError["InternalError"] = "Internal server error.";
  EGenericError["MissingFilters"] = "You need to specify one or more filters";
})(EGenericError || (exports.EGenericError = EGenericError = {}));