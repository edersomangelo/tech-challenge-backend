import {
  ServerRoute,
  ResponseToolkit,
  Lifecycle,
  RouteOptionsValidate,
  Request,
  RouteOptionsResponseSchema
} from '@hapi/hapi'
import joi from 'joi'
import Boom from '@hapi/boom'

import * as movies from '../../lib/movies'
import * as genres from '../../lib/genres'
import * as movieGenres from '../../lib/movie_genres'
import { isHasCode } from '../../util/types'
import { PayloadMovie } from '../../data/models/movies'


interface ParamsId {
  id: number
}
const validateParamsId: RouteOptionsValidate = {
  params: joi.object({
    id: joi.number().required().min(1),
  })
}

const validatePayloadMovie: RouteOptionsResponseSchema = {
  payload: joi.object({
    name: joi.string().required(),
    releasedAt: joi.date().required(),
    runtime: joi.number().required(),
    synopsis: joi.string(),
    genres: joi.array()
  })
}


export const movieRoutes: ServerRoute[] = [{
  method: 'GET',
  path: '/movies',
  handler: getAll,
},{
  method: 'GET',
  path: '/movies/getMoviesByActor/{id}',
  handler: getMoviesByActor,
  options: { validate: validateParamsId },
},{
  method: 'POST',
  path: '/movies',
  handler: post,
  options: { validate: validatePayloadMovie },
},{
  method: 'GET',
  path: '/movies/{id}',
  handler: get,
  options: { validate: validateParamsId },
},{
  method: 'PUT',
  path: '/movies/{id}',
  handler: put,
  options: { validate: {...validateParamsId, ...validatePayloadMovie} },
},{
  method: 'DELETE',
  path: '/movies/{id}',
  handler: remove,
  options: { validate: validateParamsId },
},]


async function getAll(_req: Request, _h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  return movies.list()
}

async function getMoviesByActor(req: Request, _h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  const { id } = (req.params as ParamsId)

  const found = await movies.listByActorId(id)
  return found || Boom.notFound()
}

async function get(req: Request, _h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  const { id } = (req.params as ParamsId)

  const found = await movies.find(id)
  return found || Boom.notFound()
}

async function post(req: Request, h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  try {
    const payload = req.payload as PayloadMovie
    const id = await movies.create(payload)

    if(payload.genres != undefined){
      await populateGenres(payload.genres,id)
    }
    const result = {
      id,
      path: `${req.route.path}/${id}`
    }
    return h.response(result).code(201)
  }
  catch(er: unknown){
    if(!isHasCode(er) || er.code !== 'ER_DUP_ENTRY') throw er
    return Boom.conflict()
  }
}

async function put(req: Request, h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  const { id } = (req.params as ParamsId)

  try {
    return await movies.update(id, req.payload as PayloadMovie) ? h.response().code(204) : Boom.notFound()
  }
  catch(er: unknown){
    if(!isHasCode(er) || er.code !== 'ER_DUP_ENTRY') throw er
    return Boom.conflict()
  }
}

async function remove(req: Request, h: ResponseToolkit, _err?: Error): Promise<Lifecycle.ReturnValue> {
  const { id } = (req.params as ParamsId)

  return await movies.remove(id) ? h.response().code(204) : Boom.notFound()
}

async function populateGenres(genresData: Array<string|number>, movieId: number): Promise<void> {
  for(const genre of genresData) {
    let genreId = genre

    if(typeof(genre) == 'string'){
      genreId = await genres.findOrCreate(genre)
    }

    await movieGenres.create(movieId, Number(genreId))
  }
}
