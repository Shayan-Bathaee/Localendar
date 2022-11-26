require('dotenv').config();
const app = require('./app.js');
const PORT = process.env.PORT || 3010;

const path = require("path");


if(process.env.PORT === "production"){

  app.use(express.static(path.join(__dirname, "frontend/build")));

}

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
  console.log(`API Testing UI: http://localhost:${PORT}/v0/api-docs/`)
})
