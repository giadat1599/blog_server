import express from 'express'

import * as userHandlers from '@/handlers/user.handler'

const router = express.Router()

router.get('/', userHandlers.getUser)

export default router
