import { DefaultResponse } from "../DefaultResponse"

export class TranscriptionResultItem{
  precision!: number
  text!: string
  speakerTag!: number
  startTimeSeconds!: number
  endTimeSeconds!: number
}

export class TranscriptionResult implements DefaultResponse<Array<TranscriptionResultItem>>
{
  successful!: boolean
  data!: TranscriptionResultItem[]
  messages!: string[]
  fileName!: string
  date!: Date
}
