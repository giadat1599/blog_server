import express from 'express'

import * as postHandlers from '@/handlers/post.handler'
import validate from '@/middlewares/validate.middleware'
import { getPostBySlugSchema } from '@/validations/param/get_post_by_slug.validation'
import { postsPaginationSchema } from '@/validations/query/posts_pagination.validation'

const router = express.Router()

router.get('/', validate(postsPaginationSchema, 'query'), postHandlers.posts)

router.get('/slugs', postHandlers.slugs)

router.get('/:slug', validate(getPostBySlugSchema, 'params'), postHandlers.post)

export default router
