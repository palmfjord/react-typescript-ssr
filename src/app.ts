import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as serve from 'koa-static'
import * as Router from 'koa-router'
import { resolve } from 'path'

import { getPage } from './service/controllers/getPage'
import { routes } from './routes'

export const createApp = () => {
  const app = new Koa()
  const router = new Router()

  app.use(mount('/static', serve(resolve(__dirname, '../static'))))
  routes.forEach(route => {
    router.get(route.exact ? route.path : `${route.path}/*`, getPage)
  })

  app.use(router.middleware())

  return app
}
