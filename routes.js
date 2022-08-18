const express = require("express")
const router = express.Router()

//Controllers
const homeControllers = require("./src/controllers/homeControllers")

//Home route
router.get("/", homeControllers.index)

module.exports = router