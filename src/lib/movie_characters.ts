import { knex } from '../util/knex'
import { MovieCharacters, PayloadMovieCharacters } from '../data/models/movie_characters'

const getModel = (payload: Partial<PayloadMovieCharacters>):Partial<MovieCharacters> => {
  const movie_characters:Partial<MovieCharacters> = {}

  if(typeof(payload.id) == 'number'){
    movie_characters.id = payload.id
  }

  if(typeof(payload.name) == 'string'){
    movie_characters.name = payload.name
  }

  if(typeof(payload.movieId) == 'number'){
    movie_characters.movie_id = payload.movieId
  }

  if(typeof(payload.actorId) == 'number'){
    movie_characters.actor_id = payload.actorId
  }

  return movie_characters
}

export function list(): Promise<MovieCharacters[]> {
  return knex.from('movie_character').select()
}

export function listByActorId(actor_id: number): Promise<MovieCharacters[]> {
  return knex.from('movie_character').where({actor_id}).select()
}

export function find(id: MovieCharacters['id']): Promise<MovieCharacters> {
  return knex.from('movie_character').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: MovieCharacters['id']): Promise<boolean> {
  const count = await knex.from('movie_character').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(payload: PayloadMovieCharacters): Promise<number> {
  const model = getModel(payload)
  const [ id ] = await (knex.into('movie_character').insert(model))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, payload: Partial<PayloadMovieCharacters>): Promise<boolean>  {
  const model = getModel(payload)
  const count = await knex.from('movie_character').where({ id }).update(model)
  return count > 0
}
