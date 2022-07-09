"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeStorageProvider = void 0;

class FakeStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const findIndex = this.storage.findIndex(storageFile => storageFile === file);
    this.storage.splice(findIndex, 1);
  }

}

exports.FakeStorageProvider = FakeStorageProvider;