import { RequestHandler } from 'express'

import { OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import { getPosts } from '@/services/post.service'

export const posts: RequestHandler = asyncHandler(async (req, res) => {
  const posts = await getPosts()
  res.status(OK).json(posts)
})
