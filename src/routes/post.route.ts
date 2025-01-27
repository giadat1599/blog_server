import express from 'express'

import * as postHandlers from '@/handlers/post.handler'
import validate from '@/middlewares/validate.middleware'
import { postsPaginationSchema } from '@/validations/query/posts_pagination.validation'

const router = express.Router()

router.get('/', validate(postsPaginationSchema, 'query'), postHandlers.posts)

export default router
