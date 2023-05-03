interface BaseUser{
  email: string
  password: string
}

export interface InputUser extends BaseUser {
  name: string
  username: string
  passwordConfirm: string
  planId: number
  birthDate: Date
  termsAccepted: boolean
}

export interface OutputUser {
  name: string
  username: string
  email: string
  birthDate: Date
  dateAdded: Date
  termsAgreed: boolean
  isConfirmed: boolean
}

export interface Login extends BaseUser {
}

export interface PasswordReset extends BaseUser {
  token: string
  passwordConfirm: string
}

export interface PasswordUpdate{
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export interface ConfirmAccount {
  email: string
  token: string
}
