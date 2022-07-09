"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _bcryptjs = require("bcryptjs");

var _classValidator = require("class-validator");

var _eUser = require("../../utils/enums/e-user");

var _AccessProfile = require("../../../accessProfiles/infra/typeorm/entities/AccessProfile");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _classValidator.IsEmpty)({
  message: 'Password is required'
}), _dec2 = Reflect.metadata("design:type", String), _dec3 = Column({
  name: 'last_name'
}), _dec4 = Reflect.metadata("design:type", String), _dec5 = Column({
  name: 'full_name'
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = Column({
  name: 'status',
  default: _eUser.EUserStatus.Active
}), _dec8 = Reflect.metadata("design:type", Number), _dec9 = CreateDateColumn({
  name: 'created_at'
}), _dec10 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec11 = Column({
  name: 'created_by_id',
  nullable: true,
  default: null
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = Column({
  name: 'created_by_name',
  nullable: true,
  default: null
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = UpdateDateColumn({
  name: 'updated_at'
}), _dec16 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec17 = Column({
  name: 'updated_by_id',
  nullable: true,
  default: null
}), _dec18 = Reflect.metadata("design:type", String), _dec19 = Column({
  name: 'updated_by_name',
  nullable: true,
  default: null
}), _dec20 = Reflect.metadata("design:type", String), _dec21 = DeleteDateColumn({
  name: 'deletion_date'
}), _dec22 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec23 = Column({
  name: 'last_access',
  nullable: true,
  default: null
}), _dec24 = Reflect.metadata("design:type", String), _dec25 = ManyToOne(() => _AccessProfile.AccessProfile, accessProfile => accessProfile.users, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  eager: true
}), _dec26 = JoinColumn(), _dec27 = Reflect.metadata("design:type", typeof _AccessProfile.AccessProfile === "undefined" ? Object : _AccessProfile.AccessProfile), _dec28 = Column({
  name: 'avatar',
  nullable: true,
  default: null
}), _dec29 = Reflect.metadata("design:type", String), _dec30 = Column({
  name: 'username',
  unique: true
}), _dec31 = Reflect.metadata("design:type", String), _dec32 = Column({
  name: 'email',
  unique: true
}), _dec33 = Reflect.metadata("design:type", String), _dec34 = Column({
  name: 'password'
}), _dec35 = Reflect.metadata("design:type", String), _dec36 = BeforeInsert(), _dec37 = BeforeUpdate(), _dec38 = Reflect.metadata("design:type", Function), _dec39 = Reflect.metadata("design:paramtypes", []), _dec40 = BeforeInsert(), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", []), (_class = class User {
  constructor() {
    this.id = void 0;

    _initializerDefineProperty(this, "firstName", _descriptor, this);

    _initializerDefineProperty(this, "lastName", _descriptor2, this);

    _initializerDefineProperty(this, "fullName", _descriptor3, this);

    _initializerDefineProperty(this, "status", _descriptor4, this);

    _initializerDefineProperty(this, "createdAt", _descriptor5, this);

    _initializerDefineProperty(this, "createdById", _descriptor6, this);

    _initializerDefineProperty(this, "createdByName", _descriptor7, this);

    _initializerDefineProperty(this, "updatedAt", _descriptor8, this);

    _initializerDefineProperty(this, "updatedById", _descriptor9, this);

    _initializerDefineProperty(this, "updatedByName", _descriptor10, this);

    _initializerDefineProperty(this, "deletionDate", _descriptor11, this);

    _initializerDefineProperty(this, "lastAccess", _descriptor12, this);

    _initializerDefineProperty(this, "accessProfile", _descriptor13, this);

    _initializerDefineProperty(this, "avatar", _descriptor14, this);

    _initializerDefineProperty(this, "username", _descriptor15, this);

    _initializerDefineProperty(this, "email", _descriptor16, this);

    _initializerDefineProperty(this, "password", _descriptor17, this);
  }

  generateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  hashPassword() {
    this.password = (0, _bcryptjs.hashSync)(this.password, 8);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "firstName", [_dec, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "lastName", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "fullName", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "status", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "createdAt", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "createdById", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "createdByName", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "updatedAt", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "updatedById", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "updatedByName", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "deletionDate", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "lastAccess", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "accessProfile", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "avatar", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "username", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "email", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "password", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "generateFullName", [_dec36, _dec37, _dec38, _dec39], Object.getOwnPropertyDescriptor(_class.prototype, "generateFullName"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hashPassword", [_dec40, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class.prototype, "hashPassword"), _class.prototype)), _class));
exports.User = User;