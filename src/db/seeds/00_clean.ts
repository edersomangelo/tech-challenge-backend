import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('movie_genre').delete()
  await knex('movie_character').delete()
  await knex('genre').delete()
  await knex('movie').delete()
  await knex('actor').delete()
}
