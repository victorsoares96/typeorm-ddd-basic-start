import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { AccessProfile } from '../entities/AccessProfile';

@ValidatorConstraint({ async: true })
export class IsAccessProfileAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(name: string) {
    const accessProfilesRepository = getRepository(AccessProfile);
    return accessProfilesRepository
      .findOne({ where: { name } })
      .then(accessProfile => {
        if (accessProfile) return false;
        return true;
      });
  }
}

export function IsAccessProfileAlreadyExist(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAccessProfileAlreadyExistConstraint,
    });
  };
}
