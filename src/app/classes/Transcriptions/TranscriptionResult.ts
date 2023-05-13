import { DefaultResponse } from "../DefaultResponse"

export interface TranscriptionResultItem{
  precision: number
  text: string
  speakerTag: number
  startTimeSeconds: number
  endTimeSeconds: number
}

export interface TranscriptionResult extends DefaultResponse<Array<TranscriptionResultItem>>
{
  successful: boolean
  data: TranscriptionResultItem[]
  messages: string[]
  fileName: string
  storageUri: string
  date: Date
}
