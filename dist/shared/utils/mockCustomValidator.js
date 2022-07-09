"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockCustomValidator = mockCustomValidator;

var _classValidator = require("class-validator");

/* eslint-disable @typescript-eslint/ban-ts-comment */
function mockCustomValidator(target, property, name) {
  const storage = (0, _classValidator.getMetadataStorage)();
  console.log(storage.find(item => item.message === 'This permission is already exists.'));
  const metadatas = storage.getTargetValidationMetadatas(target, target.name, true, true);
  const metadata = metadatas.find(a => {
    if (a.propertyName === property && storage.getTargetValidatorConstraints(a.constraintCls).find(a => a.name === name)) {
      return true;
    }

    return false;
  });
  return jest.spyOn( // @ts-ignore
  metadata.constraintCls.prototype, 'validate');
}