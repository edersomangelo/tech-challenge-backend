import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('genre').insert([
    {id: 1, name: 'Comedy'},
    {id: 2, name: 'Crime'},
    {id: 3, name: 'Drama' },
    {id: 4, name: 'Terror'},
    {id: 5, name: 'Adventure'},
    {id: 6, name: 'Action'},
  ])
}
