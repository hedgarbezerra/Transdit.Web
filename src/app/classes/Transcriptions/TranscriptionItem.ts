export interface TranscriptionItem {
  id: number
  name: string
  inputedFileName: string
  storageFileName: string
  language: string
  result: string
  lengthInSeconds: number
  date: Date
}
