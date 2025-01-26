import cors from 'cors'
import express from 'express'
import requestID from 'express-request-id'
import session from 'express-session'
import passport from 'passport'
import './config/passport'

import env from './env'

import createApp from '@/lib/create_app'
import errorHandler from '@/middlewares/error.middleware'
import notFoundHandler from '@/middlewares/not_found.middleware'
import postRoutes from '@/routes/post.route'
import userRoutes from '@/routes/user.route'

const app = createApp()

app.use(requestID())
app.use(
  cors({
    origin: env.BLOG_CLIENT_URL,
    credentials: true
  })
)
app.use(express.json())

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (_, res) => {
  res.status(200).json('Hello Blog API')
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
