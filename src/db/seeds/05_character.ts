import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('movie_character').insert([
    {
      actor_id: 1,
      movie_id: 4,
      name: 'Billy'
    },
    {
      actor_id: 1,
      movie_id: 3,
      name: 'Jack Dawson'
    },
    {
      actor_id: 2,
      movie_id: 2,
      name: 'Michael Corleone'
    },
    {
      actor_id: 3,
      movie_id: 1,
      name: 'Rick'
    },
    {
      actor_id: 3,
      movie_id: 2,
      name: 'Paul'
    },
    {
      actor_id: 3,
      movie_id: 3,
      name: 'Jhon'
    },
    {
      actor_id: 3,
      movie_id: 4,
      name: 'Garry'
    }
  ])
}
