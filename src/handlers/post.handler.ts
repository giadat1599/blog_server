import { OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import { getPosts } from '@/services/post.service'
import getOffsetPagination from '@/utils/get_offset_pagination'
import { PostsPaginationValues } from '@/validations/query/posts_pagination.validation'

export const posts = asyncHandler(async (req, res) => {
  const pagination = req.query as PostsPaginationValues

  const posts = await getPosts(getOffsetPagination(pagination.page, pagination.limit))

  res.status(OK).json(posts)
})
