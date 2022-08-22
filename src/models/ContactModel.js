const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true }
})

module.exports = mongoose.model("Contact", ContactSchema)
