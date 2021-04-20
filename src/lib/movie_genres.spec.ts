import { script } from '@hapi/lab'
import { expect } from '@hapi/code'
import sinon from 'sinon'

export const lab = script()
const { beforeEach, before, after, afterEach, describe, it } = lab

import { remove, create } from './movie_genres'
import { knex } from '../util/knex'

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
      knex_where: sandbox.stub(knex, 'where'),
      knex_delete: sandbox.stub(knex, 'delete'),
      knex_into: sandbox.stub(knex, 'into'),
      knex_insert: sandbox.stub(knex, 'insert'),
    }
  })

  beforeEach(({context}: Flags) => {
    if(!isContext(context)) throw TypeError()

    context.stub.knex_from.returnsThis()
    context.stub.knex_where.returnsThis()
    context.stub.knex_into.returnsThis()
  })

  afterEach(() => sandbox.resetHistory())
  after(() => sandbox.restore())

  describe('remove', () => {

    it('removes one row from table `movie_genre`, by `genre_id` and `movie_id`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyMovieId = 123
      const anyGenreId = 1
      context.stub.knex_delete.resolves()

      await remove(anyMovieId, anyGenreId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie_genre')
      sinon.assert.calledOnceWithExactly(context.stub.knex_where, { genre_id: anyGenreId, movie_id: anyMovieId })
      sinon.assert.calledOnce(context.stub.knex_delete)
    })
  })

  describe('create', () => {
    it('insert one row into table `movie`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()
      const anyMovieId = 123
      const anyGenreId = 1

      context.stub.knex_insert.resolves([])

      await create(anyMovieId, anyGenreId)
      sinon.assert.calledOnceWithExactly(context.stub.knex_into, 'movie_genre')
      sinon.assert.calledOnceWithExactly(context.stub.knex_insert, { genre_id: anyGenreId, movie_id: anyMovieId })
    })

    it('returns the `id` created for the new row', async ({context}: Flags) => {

      if(!isContext(context)) throw TypeError()
      const anyMovieId = 123
      const anyGenreId = 1

      context.stub.knex_insert.resolves([anyMovieId,anyGenreId])

      const result = await create(anyMovieId,anyGenreId)
      expect(result).to.be.array()
      expect(result).equals([anyMovieId,anyGenreId])
    })
  })
}))
