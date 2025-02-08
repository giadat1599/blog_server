import { CREATED, OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import { createNewChildComment, getChildComments } from '@/services/comment.service'
import { CreateChildCommentValues } from '@/validations/body/create_child_comment.validation'
import { GetCommentsByParentIdValues } from '@/validations/param/get_comments_by_parent_id.validation'

export const childComments = asyncHandler(async (req, res) => {
  const { commentId } = req.params as unknown as GetCommentsByParentIdValues

  const comments = await getChildComments(commentId)

  res.status(OK).json(comments)
})

export const createChildComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params as unknown as GetCommentsByParentIdValues
  const body = req.body as CreateChildCommentValues

  const comment = await createNewChildComment(body, commentId, req.user!.id!)

  res.status(CREATED).json(comment)
})
