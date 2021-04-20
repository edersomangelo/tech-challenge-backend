import { Genre, GenreWithAmount } from '../data/models/genres'
import { knex } from '../util/knex'

export function list(): Promise<Genre[]> {
  return knex.from('genre').select()
}

/*
View Actor's number of Movies in Genres
As a user, I want to get the number of movies by genre on an actor profile page.
*/
export async function listWithMovieAmount(actorId: number): Promise<GenreWithAmount[]> {
  return (knex.select('genre.*')
    .count('movie_genre.movie_id as occurrences_amount')
    .from('genre')
    .innerJoin('movie_genre', 'genre.id', 'movie_genre.genre_id')
    .innerJoin('movie_character', 'movie_genre.movie_id', 'movie_character.movie_id')
    .where({'movie_character.actor_id': actorId})
    .groupBy('genre.name', 'genre.id')
    .orderBy('occurrences_amount', 'desc')) as unknown as Promise<GenreWithAmount[]>
}

export function find(id: number): Promise<Genre> {
  return knex.from('genre').where({ id }).first()
}

export function findMostFrequentGenreByActorId(actorId: number): Promise<GenreWithAmount> {
  return (knex.select('genre.*')
    .count('genre.id as occurrences_amount')
    .from('genre')
    .innerJoin('movie_genre', 'genre.id', 'movie_genre.genre_id')
    .innerJoin('movie_character', 'movie_genre.movie_id', 'movie_character.movie_id')
    .where({'movie_character.actor_id': actorId})
    .groupBy('genre.id','genre.name')
    .orderBy('occurrences_amount', 'desc')
    .first()) as unknown as Promise<GenreWithAmount>
}

export async function findOrCreate(name: string): Promise<number> {

  const result = (await knex.from('genre').where({ name }).first()) as Genre

  if(result != undefined && typeof(result.id) == 'number'){
    return new Promise(resolve => resolve(Number(result.id)))
  }

  return await create(name)
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('genre').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string): Promise<number> {
  const [ id ] = await (knex.into('genre').insert({ name }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string): Promise<boolean>  {
  const count = await knex.from('genre').where({ id }).update({ name })
  return count > 0
}
