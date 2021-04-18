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

export function find(id: number): Promise<Movie> {
  return knex.from('movie').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('movie').where({ id }).delete()
  return count > 0
}
