require("dotenv").config()
const { PORT, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

mongoose.connect(
  `mongodb+srv://vyashya12:vyashya12@user.0nkynvg.mongodb.net/test`
)
mongoose.connection.once("open", () => console.log("Connected to DB"))

app.use("/auth", require("./routes/auth"))

app.listen(process.env.PORT, () => console.log(`Server is running in ${PORT}`))
