import { Genre } from '../data/models/genres'
import { knex } from '../util/knex'

export function list(): Promise<Genre[]> {
  return knex.from('genre').select()
}

export function find(id: number): Promise<Genre> {
  return knex.from('genre').where({ id }).first()
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
