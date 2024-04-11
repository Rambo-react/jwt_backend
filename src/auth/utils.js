const jwt = require('jsonwebtoken')

const signatureAccess = 'MySup3R_z3kr3t_access'
const signatureRefresh = 'MySup3R_z3kr3t_refresh'

const accessTokenAge = 20 //20 sec
const refreshTokenAge = 60 * 60 // 1 hour

const getTokens = (login) => ({
  accessToken: jwt.sign({ login }, signatureAccess, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ login }, signatureRefresh, {
    expiresIn: `${refreshTokenAge}s`,
  }),
})

module.exports = { getTokens }
