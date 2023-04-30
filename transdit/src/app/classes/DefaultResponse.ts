export interface DefaultResponse<Type> {
  successful: boolean
  data: Type
  messages: Array<string>
}
