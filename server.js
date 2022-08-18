const express = require("express")
const app = express()
const path = require("path")
const routes = require("./routes")

app.use(express.urlencoded({ extended: true }))

//Static files
app.use(express.static(path.resolve(__dirname, "public")))

//Views
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")

//Routes
app.use(routes)

app.listen(3000, () => {
  console.log("Listening on port 3000")
})