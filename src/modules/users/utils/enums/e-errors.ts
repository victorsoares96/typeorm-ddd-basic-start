export enum EUserError {
  NotFound = 'No user was found.',
  SomeNotFound = 'Some of these users were not found.',
  OnlyAuthenticateCanChangeAvatar = 'Only authenticated users can be change avatar.',
  AlreadyExist = 'This user is already exists.',
  NotDisabled = 'This user is not disabled.',
  IsRequired = 'The user is required.',
  CurrentOrNewPasswordRequired = 'The current password/new password is required.',
  IncorrectPassword = 'The password is incorrect.',
  SomeAlreadyInactive = 'Some or some users are already inactive.',
}

export enum ESessionError {
  IncorrectUsernamePasswordCombination = 'Incorrect username/password combination.',
  InvalidJWT = 'Invalid JWT token.',
  MissingJWT = 'JWT token is missing.',
}
