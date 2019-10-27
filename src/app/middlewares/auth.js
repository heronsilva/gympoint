import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { jwtConfig } from '../../config/environment'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token not provided',
    })
  }

  const [, token] = authHeader.split('Bearer ')

  try {
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret)

    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
    })
  }
}
