import { CREATED, OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import { createNewPostComment } from '@/services/comment.service'
import { getAllSlugs, getPostBySlug, getPostComments, getPostCommentsCount, getPosts, getPostsCount } from '@/services/post.service'
import getOffsetPagination from '@/utils/get_offset_pagination'
import { CreatePostCommentValues } from '@/validations/body/create_post_comment.validation'
import { GetPostByIdValues } from '@/validations/param/get_post_by_id.validation'
import { GetPostBySlugValues } from '@/validations/param/get_post_by_slug.validation'
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

export const postBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params as GetPostBySlugValues
  const post = await getPostBySlug(slug)

  res.status(OK).json(post)
})

export const slugs = asyncHandler(async (_, res) => {
  const slugs = await getAllSlugs()
  res.status(OK).json(slugs)
})

export const postComments = asyncHandler(async (req, res) => {
  const { postId } = req.params as unknown as GetPostByIdValues
  const comments = await getPostComments(postId)
  const totalCount = await getPostCommentsCount(postId)
  res.status(OK).json({
    data: comments,
    pageInfo: {
      count: totalCount
    }
  })
})

export const createPostComment = asyncHandler(async (req, res) => {
  const { postId } = req.params as unknown as GetPostByIdValues
  const body = req.body as CreatePostCommentValues
  const comment = await createNewPostComment(body, postId, req.user!.id!)

  res.status(CREATED).json(comment)
})
