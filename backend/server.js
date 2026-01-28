  const express = require("express")
  const cors = require("cors")
  require("dotenv").config()

  require("./config/db")()

  const app = express()
  const PORT = process.env.PORT || 5000

  // cors()
  app.use(cors({
    origin: "http://localhost:5173"
  }))
  app.use(express.json())
  app.use(express.urlencoded())

  app.use("/api/bookStore", require("./routers/book.route"))

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
