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
router.get("/login/logout", loginControllers.logout)


//Profile routes
router.get("/profile/:userID", checkLoggedMiddleware, getContactsMiddleware, profileControllers.index)

//Contacts routes
router.get("/contacts/index", contactsControllers.index)
router.get("/contacts/register", contactsControllers.register)
router.get("/contacts/edit", contactsControllers.edit)
router.post("/contacts/update", contactsControllers.update)
router.get("/contacts/delete/:id", contactsControllers.delete)

module.exports = router