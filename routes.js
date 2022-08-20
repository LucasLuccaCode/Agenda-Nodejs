const express = require("express")
const router = express.Router()

//Controllers
const homeControllers = require("./src/controllers/homeControllers")
const loginControllers = require("./src/controllers/loginControllers")

//Home routes
router.get("/", homeControllers.index)

//Login routes
router.get("/login/index", loginControllers.index)
router.post("/login/login", loginControllers.login)
router.post("/login/registration", loginControllers.registration)

module.exports = router