import User from '../models/User'

export default async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({
      error: 'Operation not permitted: user requires admin permission',
    })
  }

  const user = await User.findByPk(req.userId)

  if (!user) {
    return res.status(401).json({
      error: 'Operation not permitted: user not found',
    })
  }

  if (!user.admin) {
    return res.status(401).json({
      error: 'Operation not permitted: user requires admin permission',
    })
  }

  return next()
}
