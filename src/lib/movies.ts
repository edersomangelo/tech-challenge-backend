import { knex } from '../util/knex'
import { Movie, PayloadMovie } from '../data/models/movies'

const getModel = (payload: PayloadMovie):Movie => ({
  id: payload.id,
  name: payload.name,
  synopsis: payload.synopsis,
  release_date: payload.releasedAt,
  runtime: payload.runtime
})

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

/** @returns the ID that was created */
export async function create(payload: PayloadMovie): Promise<number> {
  const model = getModel(payload)
  const [ id ] = await (knex.into('movie').insert(model))
  return id
}
