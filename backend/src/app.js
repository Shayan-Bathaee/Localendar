const express = require('express')
const cors = require('cors')
const yaml = require('js-yaml')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const path = require('path')
const OpenApiValidator = require('express-openapi-validator')
const PORT = process.env.PORT || 3010

const auth = require('./auth')
const event = require('./event')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const apiSpec = path.join(__dirname, '../api/openapi.yaml')

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'))
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc))

app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true
  })
)

app.post('/v0/homepage', auth.post)
app.get('/v0/eventform', event.get)
app.post('/v0/eventform', event.post)
// Your routes go here

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status
  })
})

module.exports = app
