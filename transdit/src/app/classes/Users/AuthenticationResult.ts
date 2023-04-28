import { DefaultResponse } from "../DefaultResponse"

export class Token {
  token!: string
  userName!: string
  expiracy!: string
  isValid!: boolean
}

export class AuthenticationResult implements DefaultResponse<Token>{
  successful!: boolean
  data!: Token
  messages!: string[]

}
