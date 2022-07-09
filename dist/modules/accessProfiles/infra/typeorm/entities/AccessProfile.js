"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessProfile = void 0;

var _typeorm = require("typeorm");

var _eStatus = require("../../../utils/enums/e-status");

var _Permission = require("../../../../permissions/infra/typeorm/entities/Permission");

var _User = require("../../../../users/infra/typeorm/entities/User");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let AccessProfile = (_dec = (0, _typeorm.Entity)('access_profile'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  name: 'name',
  unique: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  name: 'description',
  nullable: true,
  default: null
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.OneToMany)(() => _User.User, user => user.accessProfile, {
  cascade: true
}), _dec9 = Reflect.metadata("design:type", Array), _dec10 = (0, _typeorm.Column)({
  name: 'status',
  default: _eStatus.EAccessProfileStatus.Active
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
}), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.ManyToMany)(() => _Permission.Permission, permission => permission.accessProfiles, {
  eager: true
}), _dec27 = (0, _typeorm.JoinTable)({
  name: 'access_profiles_permissions'
}), _dec28 = Reflect.metadata("design:type", Array), _dec(_class = (_class2 = class AccessProfile {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "description", _descriptor3, this);

    _initializerDefineProperty(this, "users", _descriptor4, this);

    _initializerDefineProperty(this, "status", _descriptor5, this);

    _initializerDefineProperty(this, "createdAt", _descriptor6, this);

    _initializerDefineProperty(this, "createdById", _descriptor7, this);

    _initializerDefineProperty(this, "createdByName", _descriptor8, this);

    _initializerDefineProperty(this, "updatedAt", _descriptor9, this);

    _initializerDefineProperty(this, "updatedById", _descriptor10, this);

    _initializerDefineProperty(this, "updatedByName", _descriptor11, this);

    _initializerDefineProperty(this, "deletionDate", _descriptor12, this);

    _initializerDefineProperty(this, "permissions", _descriptor13, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "users", [_dec8, _dec9], {
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
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "permissions", [_dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.AccessProfile = AccessProfile;