export interface InputUser  {
  email: string
  password: string
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

export interface Login{
  email: string
  password: string
}

export interface PasswordReset{
  email: string
  token: string
  password: string
  passwordConfirm: string
}

export interface PasswordUpdate{
  password: string
  newPassword: string
  newPasswordConfirm: string
}
