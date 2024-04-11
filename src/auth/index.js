const express = require('express')
const CryptoJS = require('crypto-js')
const cookie = require('cookie')
const { passwordSecret, fakeUser } = require('./data')
const { getTokens, refreshTokenAge } = require('./utils')

const authRouter = express.Router()

authRouter.post('/login', (req, res) => {
  const { login, password } = req.body

  const hash = CryptoJS.SHA256(password, passwordSecret).toString()

  const isVerifiedPassword = hash === fakeUser.passwordHash

  if (login !== fakeUser.login || !isVerifiedPassword) {
    return res.status(401).send('Login fail')
  }

  const { accessToken, refreshToken } = getTokens(login)

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenAge,
    })
  )

  res.send({ accessToken })
})

module.exports = authRouter
