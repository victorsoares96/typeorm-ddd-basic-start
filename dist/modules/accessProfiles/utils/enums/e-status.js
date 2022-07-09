"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EAccessProfileStatus = void 0;
let EAccessProfileStatus;
exports.EAccessProfileStatus = EAccessProfileStatus;

(function (EAccessProfileStatus) {
  EAccessProfileStatus[EAccessProfileStatus["Deleted"] = 2] = "Deleted";
  EAccessProfileStatus[EAccessProfileStatus["Active"] = 1] = "Active";
  EAccessProfileStatus[EAccessProfileStatus["Inactive"] = 0] = "Inactive";
})(EAccessProfileStatus || (exports.EAccessProfileStatus = EAccessProfileStatus = {}));