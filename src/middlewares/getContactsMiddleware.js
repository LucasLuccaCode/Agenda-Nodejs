const ContactModel = require("../models/ContactModel")

module.exports = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find()
    res.locals.contacts = contacts.length ? contacts : null
    next()
  } catch (err) {
    console.log(err)
  }
  res.locals.contacts = null
  next()
}