export class DefaultResponse<Type> {
  successful: boolean
  data: Type
  messages!: Array<string>

  constructor(success: boolean, data: Type){
    this.successful = success;
    this.data = data;
    this.messages = [];
  }
}
