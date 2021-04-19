import { knex } from '../util/knex'
import { Movie, PayloadMovie } from '../data/models/movies'

const getModel = (payload: Partial<PayloadMovie>):Partial<Movie> => {
  const movie:Partial<Movie> = {}

  if(typeof(payload.id) == 'number'){
    movie.id = payload.id
  }

  if(typeof(payload.name) == 'string'){
    movie.name = payload.name
  }

  if(typeof(payload.synopsis) == 'string'){
    movie.synopsis = payload.synopsis
  }

  if(payload.releasedAt !== undefined){
    movie.release_date = payload.releasedAt
  }

  if(typeof(payload.runtime) == 'number'){
    movie.runtime = payload.runtime
  }

  return movie
}

export function list(): Promise<Movie[]> {
  return knex.from('movie').select()
}

export function listByActorId(actor_id: number): Promise<Movie[]> {
  return knex.from('movie').join('movie_character', 'movie_character.movie_id', '=', 'movie.id').where({actor_id}).select('movie.*')
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

/** @returns whether the ID was actually found */
export async function update(id: number, payload: Partial<PayloadMovie>): Promise<boolean>  {
  const model = getModel(payload)
  const count = await knex.from('movie').where({ id }).update(model)
  return count > 0
}
