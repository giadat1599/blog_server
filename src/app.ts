import cors from 'cors'
import express from 'express'
import requestID from 'express-request-id'

import createApp from '@/lib/create_app'
import errorHandler from '@/middlewares/error.middleware'
import notFoundHandler from '@/middlewares/not_found.middleware'
import userRoutes from '@/routes/user.route'

const app = createApp()

app.use(requestID())
app.use(cors())

app.use(express.json())

app.get('/', (_, res) => {
  res.status(200).json('Hello Blog API')
})

app.use('/users', userRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
