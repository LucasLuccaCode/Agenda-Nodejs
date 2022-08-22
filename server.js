require("dotenv").config()

const express = require("express")
const app = express()
const path = require("path")
const routes = require("./routes")
const mongoose = require("mongoose")
const flash = require("connect-flash")

//Mongodb
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log("Connected to Mongodb")
  app.emit("logged")
})
  .catch(err => console.log("Erro ao se conectar ao Mongodb"))


app.use(express.urlencoded({ extended: true }))

//Static files
app.use(express.static(path.resolve(__dirname, "public")))

//Views
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")

//Session / Flash
const sessionMiddleware = require("./src/middlewares/sessionMiddleware")
app.use(sessionMiddleware)
app.use(flash())

//Global Middlewares
const setLocalsMiddleware = require("./src/middlewares/setLocalMiddleware")
app.use(setLocalsMiddleware)

//Routes
app.use(routes)

app.on("logged", () => {
  app.listen(3000, () => {
    console.log("Listening on port 3000")
  })
})