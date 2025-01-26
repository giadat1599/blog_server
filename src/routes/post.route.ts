import express from 'express'

import * as postHandlers from '@/handlers/post.handler'

const router = express.Router()

router.get('/', postHandlers.posts)

export default router
