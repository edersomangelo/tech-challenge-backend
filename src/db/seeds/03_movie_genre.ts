import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('movie_genre').insert([
    {
      movie_id: 1,
      genre_id: 1
    },
    {
      movie_id: 2,
      genre_id: 2
    },
    {
      movie_id: 2,
      genre_id: 3
    },
    {
      movie_id: 3,
      genre_id: 3
    },
    {
      movie_id: 3,
      genre_id: 7
    },
    {
      movie_id: 4,
      genre_id: 2
    },
    {
      movie_id: 4,
      genre_id: 8
    },
    {
      movie_id: 4,
      genre_id: 3
    }
  ])
}
