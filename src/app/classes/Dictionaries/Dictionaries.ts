export interface Dictionary {
  id: number
  name: string
  description: string
}

export interface OutDictionary extends Dictionary{
  date: string
  words: DictionaryWord[]
}

export interface DictionaryWord {
  id: number
  word: string
}
