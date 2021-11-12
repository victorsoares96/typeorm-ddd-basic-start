import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(username: string, args: ValidationArguments) {
    const { email } = args.object as User;
    const userRepository = getRepository(User);
    return userRepository
      .findOne({ where: [{ email }, { username }] })
      .then(user => {
        if (user) return false;
        return true;
      });
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
