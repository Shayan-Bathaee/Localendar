require('dotenv').config()
const app = require('./app.js')
const PORT = process.env.PORT || 3010

const path = require('path')

// serves the bundle to webhosting service
if (process.env.PORT === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
}

// listens for port number
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
  console.log(`API Testing UI: http://localhost:${PORT}/v0/api-docs/`)
})
