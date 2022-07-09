"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEmail = isValidEmail;

function isValidEmail(email) {
  const validateEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  if (!validateEmail.test(email)) {
    return false;
  }

  return true;
}