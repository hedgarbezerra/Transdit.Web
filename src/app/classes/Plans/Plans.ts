export interface Plan {
  id: number,
  name: string
  description: string
  allowTranscriptionSaving: boolean
  price: number
  monthlyLimitUsageMinutes: number
}
