import express from 'express'
import corsMiddleware from './middlewares/corsMiddleware.js'
import { createRouter } from './routes/appRouter.js'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/', createRouter())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`)
})
