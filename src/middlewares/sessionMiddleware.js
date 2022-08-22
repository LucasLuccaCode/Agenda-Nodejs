require("dotenv").config()

const session = require("express-session")
const MongoStore = require("connect-mongo")

module.exports = session({
  secret: "erl-l as541j we",
  store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 7 * 1000,
    httpOnly: true
  }
})
