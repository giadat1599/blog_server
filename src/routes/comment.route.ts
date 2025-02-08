import express from 'express'

import * as commentHandlers from '@/handlers/comment.handler'
import requiredAuth from '@/middlewares/required_auth.middleware'
import validate from '@/middlewares/validate.middleware'
import { createChildCommentSchema } from '@/validations/body/create_child_comment.validation'
import { getCommentsByParentIdSchema } from '@/validations/param/get_comments_by_parent_id.validation'

const router = express.Router()

router.get('/:commentId/comments', validate(getCommentsByParentIdSchema, 'params'), commentHandlers.childComments)

router.post(
  '/:commentId/comments',
  requiredAuth,
  validate(getCommentsByParentIdSchema, 'params'),
  validate(createChildCommentSchema),
  commentHandlers.createChildComment
)

export default router
