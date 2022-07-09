"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPassword = isValidPassword;

function isValidPassword(password) {
  const mustBeAtLeastEightCharactersOneUpperCaseOneNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return mustBeAtLeastEightCharactersOneUpperCaseOneNumber.test(password);
}