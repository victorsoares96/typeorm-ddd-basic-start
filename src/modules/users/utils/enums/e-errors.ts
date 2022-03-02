export enum EUserError {
  NotFound = 'No user was found.',
  SomeNotFound = 'Some of these users were not found.',
  OnlyAuthenticateCanChangeAvatar = 'Only authenticated users can be change avatar.',
  AlreadyExist = 'This user is already exists.',
  AlreadyInactive = 'This user is already inactive.',
  NotDisabled = 'This user is not disabled.',
  IsRequired = 'The user is required.',
  IdIsRequired = 'The user id is required.',
  CurrentOrNewPasswordRequired = 'The current password/new password is required.',
  IncorrectPassword = 'The password is incorrect.',
  SomeAlreadyInactive = 'Some or some users are already inactive.',
  FirstNameIsRequired = 'First name is required.',
  LastNameIsRequired = 'Last name is required.',
  UsernameTooShort = 'The username must be at least 5 characters long.',
  UsernameTooLong = 'The username must be at most 15 characters long.',
  UsernameIsRequired = 'Username is required.',
  EmailIsRequired = 'Email is required.',
  EmailIsInvalid = 'Email is invalid.',
  PasswordMustBeAtLeastEightCharsOneUpperCaseAndOneNumber = 'Password must be at least 8 characters, 1 upper case, 1 number.',
}

export enum ESessionError {
  IncorrectUsernamePasswordCombination = 'Incorrect username/password combination.',
  InvalidJWT = 'Invalid JWT token.',
  MissingJWT = 'JWT token is missing.',
}
