const express = require("express")
const router = express.Router()

//Controllers
const homeControllers = require("./src/controllers/homeControllers")
const loginControllers = require("./src/controllers/loginControllers")
const profileControllers = require("./src/controllers/profileControllers")
const contactsControllers = require("./src/controllers/contactsControllers")

//Middlewares
const checkLoggedMiddleware = require("./src/middlewares/checkLoggedMiddleware")
const getContactsMiddleware = require("./src/middlewares/getContactsMiddleware")

//Home routes
router.get("/", getContactsMiddleware, homeControllers.index)

//Login routes
router.get("/login/index", loginControllers.index)
router.post("/login/register", loginControllers.register)
router.post("/login/login", loginControllers.login)


//Profile routes
router.get("/profile/user/:userID", checkLoggedMiddleware, getContactsMiddleware, profileControllers.index)
router.get("/profile/logout", profileControllers.logout)

//Contacts routes
router.get("/contacts/index", contactsControllers.index)
router.post("/contacts/register", contactsControllers.register)
router.post("/contacts/update", contactsControllers.update)
router.get("/contacts/delete", contactsControllers.delete)

module.exports = router