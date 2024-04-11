const jwt = require('jsonwebtoken')

const signatureAccess = 'MySup3R_z3kr3t_access'
const signatureRefresh = 'MySup3R_z3kr3t_refresh'

const accessTokenAge = 20 //20 sec
const refreshTokenAge = 60 * 60 // 1 hour

const verifyAuthorizationMiddleWare = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : ''

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(token, signatureAccess)
    req.user = decoded
  } catch (err) {
    return res.sendStatus(401)
  }

  return next()
}

const verifyRefreshTokenMiddleware = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(refreshToken, signatureRefresh)
    req.user = decoded
  } catch (err) {
    return res.sendStatus(401)
  }
  return next()
}

const getTokens = (login) => ({
  accessToken: jwt.sign({ login }, signatureAccess, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ login }, signatureRefresh, {
    expiresIn: `${refreshTokenAge}s`,
  }),
})

module.exports = {
  getTokens,
  verifyAuthorizationMiddleWare,
  refreshTokenAge,
  verifyRefreshTokenMiddleware,
}
