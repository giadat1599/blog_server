import { OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import { getAllSlugs, getPostBySlug, getPosts, getPostsCount } from '@/services/post.service'
import getOffsetPagination from '@/utils/get_offset_pagination'
import { PostsPaginationValues } from '@/validations/query/posts_pagination.validation'

export const posts = asyncHandler(async (req, res) => {
  const pagination = req.query as PostsPaginationValues

  const totalCount = await getPostsCount()
  const { skip, limit, hasNextPage, hasPreviousPage, count, page, totalPages } = getOffsetPagination(pagination.page, pagination.limit, totalCount)

  const posts = await getPosts({ skip, limit })

  res.status(OK).json({
    data: posts,
    pageInfo: {
      page,
      count,
      totalPages,
      hasNextPage,
      hasPreviousPage
    }
  })
})

export const post = asyncHandler(async (req, res) => {
  const { slug } = req.params
  const post = await getPostBySlug(slug)

  res.status(OK).json(post)
})

export const slugs = asyncHandler(async (_, res) => {
  const slugs = await getAllSlugs()
  res.status(OK).json(slugs)
})
