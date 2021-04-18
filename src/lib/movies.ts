import { knex } from '../util/knex'
import { Movie } from '../data/models/movies'

export function list(): Promise<Movie[]> {
  return knex.from('movie').select()
}

export function find(id: Movie['id']): Promise<Movie> {
  return knex.from('movie').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: Movie['id']): Promise<boolean> {
  const count = await knex.from('movie').where({ id }).delete()
  return count > 0
}
