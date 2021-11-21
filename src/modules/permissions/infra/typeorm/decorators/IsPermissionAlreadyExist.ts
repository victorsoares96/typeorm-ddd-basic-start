import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { container } from 'tsyringe';
import { FindManyPermissionService } from '@modules/permissions/services/FindManyPermissionService';

@ValidatorConstraint({ async: true })
export class IsPermissionAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(name: string) {
    const findPermission = container.resolve(FindManyPermissionService);

    return findPermission.execute({ name }).then(([permissions]) => {
      if (permissions.length > 0) {
        return false;
      }

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
