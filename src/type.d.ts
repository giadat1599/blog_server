/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express'

import { User as UserI } from '@/db/schemas/user'

declare global {
  namespace Express {
    interface Request {
      id?: string
    }
    interface User extends Partial<UserI> {}
  }
}
