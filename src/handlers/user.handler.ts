import { RequestHandler } from 'express'

export const getUser: RequestHandler = (req, res) => {
  console.log(req.id)
  res.json({
    user: '123'
  })
}
