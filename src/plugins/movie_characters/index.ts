import { Server, Plugin } from '@hapi/hapi'
import { characterRoutes } from './routes'

export const character: Plugin<void> = {
  name: 'character',
  version: '1.0.0',
  multiple: false,
  register: (server: Server, _options: void) => server.route(characterRoutes)
}
