export interface InputUser {
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
  username: string
  email: string
}
