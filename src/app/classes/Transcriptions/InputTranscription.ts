export interface TranscriptionInput {
  name: string
  fileName: string
  language: string
  youtubeUrl: string
  startTime: string
  endTime: string
  speakers: number
  hintsImpact: number
  hints: string[]
  additionalLanguages: string[]
  save: boolean
  isConverted: boolean
}
