import { script } from '@hapi/lab'
import sinon from 'sinon'

export const lab = script()
const { beforeEach, before, after, afterEach, describe, it } = lab

import { list } from './movies'
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
      knex_select: sandbox.stub(knex, 'select'),
    }
  })

  beforeEach(({context}: Flags) => {
    if(!isContext(context)) throw TypeError()

    context.stub.knex_from.returnsThis()
    context.stub.knex_select.returnsThis()
  })

  afterEach(() => sandbox.resetHistory())
  after(() => sandbox.restore())

  describe('list', () => {

    it('returns rows from table `movie`', async ({context}: Flags) => {
      if(!isContext(context)) throw TypeError()

      await list()
      sinon.assert.calledOnceWithExactly(context.stub.knex_from, 'movie')
      sinon.assert.calledOnce(context.stub.knex_select)
    })
  })
}))
