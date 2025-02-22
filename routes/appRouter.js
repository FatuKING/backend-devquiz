import { Router } from 'express'
import { AppController } from '../controllers/appControllers.js'
import { MysqlConnection } from '../database/mysqlModel.js'

export function createRouter () {
  const appRouter = Router()

  const appModel = MysqlConnection

  const appController = new AppController({ appModel })

  appRouter.get('/categories/:categoryId/questions', appController.questions)
  appRouter.get('/categories/:categoryId/ranking', appController.rankings)
  appRouter.get('/categories/:categoryId/top/ranking', appController.topRankings)
  appRouter.post('/registerScore', appController.registerScore)
  appRouter.post('/sendMail', appController.sendMail)

  return appRouter
}
