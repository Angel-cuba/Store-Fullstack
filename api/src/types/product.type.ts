import { Document } from 'mongoose'

export type IProduct = Document & {
  name: string
  price: number
  description: string
  image: string
  category: string
  rating?: number
}

type MatchByName = {
  name: string
}
type MatchByCategory = {
  category: string
}
export type PiplineMatchStage = {
  $match: MatchByName | MatchByCategory
}
