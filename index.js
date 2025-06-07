const express = require('express')
const app = express()
const Router = require('./src/Router')
const bodyParser = require('body-parser')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.set(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,X-Requested-With',
    )
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else {
    next()
  }
})

async function verifyToken(req, token) {
  try {
    const info = await client.getTokenInfo(token)

    const currentTime = Date.now()
    if (info.expiry_date >= currentTime) {
      req.email = info.email
      req.expiry_date = info.expiry_date
      req.user_id = info.sub
      console.log(info.sub, info.email)
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

app.use(async function (req, res, next) {
  if (req.path.startsWith('/public')) {
    next()
    return
  }
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const valid = await verifyToken(req, token)
    if (valid === true) {
      next()
      return
    }
  }
  res.sendStatus(401)
})
// Use the Router
app.use(Router)

exports.api = app
