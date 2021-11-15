import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { Permission } from '../entities/Permission';

@ValidatorConstraint({ async: true })
export class IsPermissionAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(name: string) {
    const permissionsRepository = getRepository(Permission);
    return permissionsRepository
      .findOne({ where: { name } })
      .then(permission => {
        if (permission) return false;
        return true;
      });
  }
}

export function IsPermissionAlreadyExist(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPermissionAlreadyExistConstraint,
    });
  };
}
