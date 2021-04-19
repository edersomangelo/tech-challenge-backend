import { script } from '@hapi/lab'
import { expect } from '@hapi/code'
import sinon from 'sinon'

export const lab = script()
const { beforeEach, before, after, afterEach, describe, it } = lab

import { list, find, remove, create, update, listByActorId } from './movies'
import { knex } from '../util/knex'
import { PayloadMovie } from '../data/models/movies'

describe('lib', () => describe('movie', () => {
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


  const makeRequest = ():PayloadMovie =>({
    'name': 'any-name',
    'releasedAt': new Date,
    'runtime': 123
  })

  describe('list', () => {

    it('returns rows from table `movie`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()

      await list()
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
      sinon.assert.calledOnce(context.stub.knex_select)
    })
  })

  describe('listMoviesByActor', () => {

    it('returns rows from table `movie`, by `actor_id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyActorId = 123

      await listByActorId(anyActorId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
      sinon.assert.calledWithMatch(context.stub.knex_join, 'character')
      sinon.assert.calledWithExactly(context.stub.knex_where, { actor_id: anyActorId })
      sinon.assert.calledOnce(context.stub.knex_select)
    })
  })

  describe('find', () => {

    it('returns one row from table `movie`, by `id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyId = 123

      await find(anyId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { id: anyId })
      sinon.assert.calledOnce(context.stub.knex_first)
    })
  })

  describe('remove', () => {

    it('removes one row from table `movie`, by `id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyId = 123
      context.stub.knex_delete.resolves()

      await remove(anyId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
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
    it('insert one row into table `movie`', async ({context}: Flags) => {
      const request = makeRequest()

      if(!isContext(context)) throw TypeError()
      context.stub.knex_insert.resolves([])

      await create(request)
      sinon.assert.calledOnceWithExactly(context.stub.knex_into, 'movie')
      sinon.assert.calledOnceWithExactly(context.stub.knex_insert, {
        name: request.name,
        release_date: request.releasedAt,
        runtime: request.runtime
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

    it('updates one row from table `movie`, by `id`', async ({context}: Flags) => {
      const anyId = 123
      if(!isContext(context)) throw TypeError()
      const request = {synopsis: 'any content'}
      context.stub.knex_update.resolves()

      await update(anyId, request)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { id: anyId })
      sinon.assert.calledOnceWithExactly(context.stub.knex_update, request)
    })
  })
}))
