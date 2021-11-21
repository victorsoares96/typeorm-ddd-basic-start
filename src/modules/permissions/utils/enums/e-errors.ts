export enum EPermissionError {
  NameRequired = 'The permission name is required.',
  NameTooShort = 'The permission name must be at least 3 characters long.',
  NameTooLong = 'The permission name must be at most 35 characters long.',
  IsRequired = 'The permission is required.',
  NotFound = 'No permissions was found.',
  SomeNotFound = 'Some of these responsibilities were not found.',
  AlreadyExist = 'This permission is already exists.',
  IdIsRequired = 'The permission id is required.',
}
