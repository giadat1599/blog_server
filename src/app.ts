import createApp from './lib/create-app'
import errorHandler from './middlewares/error.middleware'
import notFoundHandler from './middlewares/not-found.middleware'
import userRoutes from '@/routes/user.route'
import requestID from 'express-request-id'
import cors from 'cors'

const app = createApp()

app.use(requestID())
app.use(cors())

app.get('/', (_, res) => {
  res.status(200).json('Hello Blog API')
})

app.use('/user', userRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
