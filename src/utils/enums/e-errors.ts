export enum EAccessProfileError {
  IsRequired = 'The access profile is required.',
  AccessProfileAlreadyExist = 'This access profile is already exists.',
  NotFound = 'No access profile was found.',
  NotDisabled = 'This access profile is not disabled.',
  IdIsRequired = 'The access profile id is required.',
}

export enum EPermissionError {
  IsRequired = 'The permission is required.',
  NotFound = 'No permissions was found.',
  SomeNotFound = 'Some of these responsibilities were not found.',
  AlreadyExist = 'This permission is already exists.',
  IdIsRequired = 'The permission id is required.',
}

export enum EUserError {
  NotFound = 'No user was found.',
  SomeNotFound = 'Some of these users were not found.',
  OnlyAuthenticateCanChangeAvatar = 'Only authenticated users can be change avatar.',
  AlreadyExist = 'This user is already exists.',
  NotDisabled = 'This user is not disabled.',
  IsRequired = 'The user is required.',
  CurrentOrNewPasswordRequired = 'The current password/new password is required.',
  IncorrectPassword = 'The password is incorrect.',
}

export enum EGenericError {
  AvatarFilenameRequired = 'The avatar filename is required.',
}

export enum EAuthenticateError {
  IncorrectUsernamePasswordCombination = 'Incorrect username/password combination.',
  InvalidJWT = 'Invalid JWT token.',
  MissingJWT = 'JWT token is missing.',
}
