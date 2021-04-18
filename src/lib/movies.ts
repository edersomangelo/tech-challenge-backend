import { knex } from '../util/knex'

export interface Movie {
  id: number
  name: string
  synopsis?: string
  releasedAt: Date
  runtime: number
}


export function list(): Promise<Movie[]> {
  return knex.from('movie').select()
}
