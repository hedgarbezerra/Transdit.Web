import { DefaultResponse } from "../DefaultResponse"

export interface Token {
  token: string
  userName: string
  expiracy: string
  isValid: boolean
}

export interface AuthenticationResult extends DefaultResponse<Token>{
  successful: boolean
  data: Token
  messages: string[]

}
