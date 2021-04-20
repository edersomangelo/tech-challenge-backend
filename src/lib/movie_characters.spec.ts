import { script } from '@hapi/lab'
import { expect } from '@hapi/code'
import sinon from 'sinon'

export const lab = script()
const { beforeEach, before, after, afterEach, describe, it } = lab

import { list, find, remove, create, update, listByActorId } from './movie_characters'
import { knex } from '../util/knex'
import { PayloadMovieCharacters } from '../data/models/movie_characters'

describe('lib', () => describe('movie_character', () => {
  const sandbox = Object.freeze(sinon.createSandbox())

  const isContext = (value: unknown): value is Context => {
    if(!value || typeof value !== 'object') return false
    const safe = value as Partial<Context>
    if(!safe.stub) return false
    return true
  }

  interface Context {
    stub: Record<string, sinon.SinonStub>
  }
  interface Flags extends script.Flags {
    readonly context: Partial<Context>
  }

  before(({context}: Flags) => {
    context.stub = {
      knex_from: sandbox.stub(knex, 'from'),
      knex_join: sandbox.stub(knex, 'join'),
      knex_select: sandbox.stub(knex, 'select'),
      knex_where: sandbox.stub(knex, 'where'),
      knex_first: sandbox.stub(knex, 'first'),
      knex_delete: sandbox.stub(knex, 'delete'),
      knex_into: sandbox.stub(knex, 'into'),
      knex_insert: sandbox.stub(knex, 'insert'),
      knex_update: sandbox.stub(knex, 'update'),
    }
  })

  beforeEach(({context}: Flags) => {
    if(!isContext(context)) throw TypeError()

    context.stub.knex_from.returnsThis()
    context.stub.knex_join.returnsThis()
    context.stub.knex_select.returnsThis()
    context.stub.knex_where.returnsThis()
    context.stub.knex_first.returnsThis()
    context.stub.knex_into.returnsThis()
  })

  afterEach(() => sandbox.resetHistory())
  after(() => sandbox.restore())


  const makeRequest = ():PayloadMovieCharacters =>({
    'name': 'any-name',
    'movieId': 123,
    'actorId': 123
  })

  describe('list', () => {

    it('returns rows from table `movie_characters`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()

      await list()
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_character')
      sinon.assert.calledOnce(context.stub.knex_select)
    })
  })

  describe('listByActorId', () => {

    it('returns rows from table `movie_characters`, by actor_id', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyId = 123

      await listByActorId(anyId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_character')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, {actor_id: anyId})
      sinon.assert.calledOnce(context.stub.knex_select)
    })
  })

  describe('find', () => {

    it('returns one row from table `movie_characters`, by `id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyId = 123

      await find(anyId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_character')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { id: anyId })
      sinon.assert.calledOnce(context.stub.knex_first)
    })
  })

  describe('remove', () => {

    it('removes one row from table `movie_characters`, by `id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyId = 123
      context.stub.knex_delete.resolves()

      await remove(anyId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_character')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { id: anyId })
      sinon.assert.calledOnce(context.stub.knex_delete)
    })

    ; [0, 1].forEach( rows =>
      it(`returns ${!!rows} when (${rows}) row is found and deleted`, async ({context}: Flags) => {
        if(!isContext(context)) throw TypeError()
        context.stub.knex_delete.resolves(rows)
        const anyId = 123

        const result = await remove(anyId)
        expect(result).to.be.boolean()
        expect(result).equals(!!rows)
      }))

  })

  describe('create', () => {
    it('insert one row into table `movie_characters`', async ({context}: Flags) => {
      const request = makeRequest()

      if(!isContext(context)) throw TypeError()
      context.stub.knex_insert.resolves([])

      await create(request)
      sinon.assert.calledOnceWithExactly(context.stub.knex_into, 'movie_character')
      sinon.assert.calledOnceWithExactly(context.stub.knex_insert, {
        name: request.name,
        movie_id: request.movieId,
        actor_id: request.actorId
      })
    })

    it('returns the `id` created for the new row', async ({context}: Flags) => {
      const request = makeRequest()

      if(!isContext(context)) throw TypeError()
      const anyId = 123
      context.stub.knex_insert.resolves([anyId])

      const result = await create(request)
      expect(result).to.be.number()
      expect(result).equals(anyId)
    })
  })

  describe('update', () => {

    it('updates one row from table `movie_characters`, by `id`', async ({context}: Flags) => {
      const anyId = 123
      if(!isContext(context)) throw TypeError()
      const request = {name: 'any content'}
      context.stub.knex_update.resolves()

      await update(anyId, request)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_character')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { id: anyId })
      sinon.assert.calledOnceWithExactly(context.stub.knex_update, request)
    })
  })
}))
