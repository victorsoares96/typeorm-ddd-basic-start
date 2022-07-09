"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _eUser = require("../../../utils/enums/e-user");

var _AccessProfile = require("../../../../accessProfiles/infra/typeorm/entities/AccessProfile");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _typeorm.Entity)('user'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  name: 'first_name'
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  name: 'last_name'
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)({
  name: 'full_name'
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)({
  name: 'status',
  default: _eUser.EUserStatus.Active
}), _dec11 = Reflect.metadata("design:type", Number), _dec12 = (0, _typeorm.CreateDateColumn)({
  name: 'created_at'
}), _dec13 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec14 = (0, _typeorm.Column)({
  name: 'created_by_id',
  nullable: true,
  default: null
}), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)({
  name: 'created_by_name',
  nullable: true,
  default: null
}), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.UpdateDateColumn)({
  name: 'updated_at'
}), _dec19 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec20 = (0, _typeorm.Column)({
  name: 'updated_by_id',
  nullable: true,
  default: null
}), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.Column)({
  name: 'updated_by_name',
  nullable: true,
  default: null
}), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _typeorm.DeleteDateColumn)({
  name: 'deletion_date'
}), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.Column)({
  name: 'last_access',
  nullable: true,
  default: null
}), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.ManyToOne)(() => _AccessProfile.AccessProfile, accessProfile => accessProfile.users, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  eager: true
}), _dec29 = (0, _typeorm.JoinColumn)(), _dec30 = Reflect.metadata("design:type", typeof _AccessProfile.AccessProfile === "undefined" ? Object : _AccessProfile.AccessProfile), _dec31 = (0, _typeorm.Column)({
  name: 'avatar',
  nullable: true,
  default: null
}), _dec32 = Reflect.metadata("design:type", String), _dec33 = (0, _typeorm.Column)({
  name: 'username',
  unique: true
}), _dec34 = Reflect.metadata("design:type", String), _dec35 = (0, _typeorm.Column)({
  name: 'email',
  unique: true
}), _dec36 = Reflect.metadata("design:type", String), _dec37 = (0, _typeorm.Column)({
  name: 'password'
}), _dec38 = Reflect.metadata("design:type", String), _dec39 = (0, _typeorm.BeforeInsert)(), _dec40 = (0, _typeorm.BeforeUpdate)(), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", []), _dec43 = (0, _typeorm.BeforeInsert)(), _dec44 = Reflect.metadata("design:type", Function), _dec45 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = class User {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "firstName", _descriptor2, this);

    _initializerDefineProperty(this, "lastName", _descriptor3, this);

    _initializerDefineProperty(this, "fullName", _descriptor4, this);

    _initializerDefineProperty(this, "status", _descriptor5, this);

    _initializerDefineProperty(this, "createdAt", _descriptor6, this);

    _initializerDefineProperty(this, "createdById", _descriptor7, this);

    _initializerDefineProperty(this, "createdByName", _descriptor8, this);

    _initializerDefineProperty(this, "updatedAt", _descriptor9, this);

    _initializerDefineProperty(this, "updatedById", _descriptor10, this);

    _initializerDefineProperty(this, "updatedByName", _descriptor11, this);

    _initializerDefineProperty(this, "deletionDate", _descriptor12, this);

    _initializerDefineProperty(this, "lastAccess", _descriptor13, this);

    _initializerDefineProperty(this, "accessProfile", _descriptor14, this);

    _initializerDefineProperty(this, "avatar", _descriptor15, this);

    _initializerDefineProperty(this, "username", _descriptor16, this);

    _initializerDefineProperty(this, "email", _descriptor17, this);

    _initializerDefineProperty(this, "password", _descriptor18, this);
  }

  generateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  hashPassword() {
    this.password = (0, _bcryptjs.hashSync)(this.password, 8);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "firstName", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lastName", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fullName", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "createdAt", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "createdById", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "createdByName", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "updatedAt", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "updatedById", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "updatedByName", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "deletionDate", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "lastAccess", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "accessProfile", [_dec28, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "username", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec35, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "generateFullName", [_dec39, _dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "generateFullName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hashPassword", [_dec43, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "hashPassword"), _class2.prototype)), _class2)) || _class);
exports.User = User;