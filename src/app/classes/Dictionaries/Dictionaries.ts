export interface Dictionary {
  name: string
  description: string
}

export interface OutDictionary extends Dictionary{
  id: number
  date: string
  words: DictionaryWord[]
}

export interface DictionaryWord {
  id: number
  word: string
}
