export enum EAccessProfileError {
  IsRequired = 'The access profile is required.',
  AlreadyExist = 'This access profile is already exists.',
  NameTooShort = 'The name must be at least 3 characters long.',
  NameTooLong = 'The name must be at most 35 characters long.',
  NotFound = 'No access profile was found.',
  NotDisabled = 'This access profile is not disabled.',
  IdIsRequired = 'The access profile id is required.',
}
