const Contact = require("../models/Contact")

module.exports = async (req, res, next) => {
  try {
    const contacts = await Contact.getContacts(req.session.user.username)
    res.locals.contacts = contacts.length ? contacts : null
    next()
  } catch (err) {
    console.log(err)
  }
  res.locals.contacts = null
  next()
}