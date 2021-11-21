import { FindOneAccessProfileService } from '@modules/accessProfiles/services/FindOneAccessProfileService';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { container } from 'tsyringe';

@ValidatorConstraint({ async: true })
export class IsAccessProfileAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(name: string) {
    const findAccessProfile = container.resolve(FindOneAccessProfileService);
    return findAccessProfile.execute({ name }).then(accessProfile => {
      console.log(accessProfile);
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
