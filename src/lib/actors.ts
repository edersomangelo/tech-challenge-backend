import { Actor, PayloadActor } from '../data/models/actors'
import { knex } from '../util/knex'

const getModel = (payload: Partial<PayloadActor>):Partial<Actor> => {
  const actor:Partial<Actor> = {}

  if(typeof(payload.id) == 'number'){
    actor.id = payload.id
  }

  if(typeof(payload.name) == 'string'){
    actor.name = payload.name
  }

  if(typeof(payload.bio) == 'string'){
    actor.bio = payload.bio
  }

  if(payload.bornAt !== undefined){
    actor.born_date = payload.bornAt
  }

  return actor
}

export function list(): Promise<Actor[]> {
  return knex.from('actor').select()
}

export function find(id: number): Promise<Actor> {
  return knex.from('actor').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('actor').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(payload: PayloadActor): Promise<number> {
  const model = getModel(payload)
  const [ id ] = await (knex.into('actor').insert(model))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, payload: Partial<PayloadActor>): Promise<boolean>  {
  const model = getModel(payload)
  const count = await knex.from('actor').where({ id }).update(model)
  return count > 0
}
