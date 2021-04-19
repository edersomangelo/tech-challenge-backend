import { knex } from '../util/knex'

/** @returns whether the ID was actually found */
export async function remove(movieId: number, genreId: number): Promise<boolean> {
  const count = await knex.from('movie_genre').where({ genre_id: genreId, movie_id: movieId }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(movieId: number, genreId: number): Promise<Array<number>> {
  await remove(movieId,genreId)
  return await (knex.into('movie_genre').insert({genre_id: genreId, movie_id: movieId}))
}
