import express from 'express'

import * as postHandlers from '@/handlers/post.handler'
import requiredAuth from '@/middlewares/required_auth.middleware'
import validate from '@/middlewares/validate.middleware'
import { createPostCommentSchema } from '@/validations/body/create_post_comment.validation'
import { getPostByIdSchema } from '@/validations/param/get_post_by_id.validation'
import { getPostBySlugSchema } from '@/validations/param/get_post_by_slug.validation'
import { postsPaginationSchema } from '@/validations/query/posts_pagination.validation'

const router = express.Router()

router.get('/', validate(postsPaginationSchema, 'query'), postHandlers.posts)

router.get('/slugs', postHandlers.slugs)

router.get('/:slug', validate(getPostBySlugSchema, 'params'), postHandlers.postBySlug)

router.get('/:postId/comments', validate(getPostByIdSchema, 'params'), postHandlers.postComments)

router.post(
  '/:postId/comments',
  requiredAuth,
  validate(getPostByIdSchema, 'params'),
  validate(createPostCommentSchema),
  postHandlers.createPostComment
)

export default router
