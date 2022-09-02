const mongoose = require("mongoose")
const validator = require("validator")

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  username: { type: String, required: true }
})

const ContactModel = mongoose.model("Contact", ContactSchema)

class Contact {
  constructor(body, username) {
    this.body = body
    this.username = username
    this.errors = []
    this.contact = null
  }
  async register() {
    await this.validate()
    if (this.errors.length) return
    ContactModel.create(this.body)
  }
  async edit(id) {
    await this.validate()
    if (this.errors.length) return
    this.contact = await ContactModel.updateOne({ _id: id }, { $set: this.body })
  }
  async validate() {
    this.cleanUp()
    if (!validator.isEmail(this.body.email)) this.errors.push("Email inválido.")
  }
  cleanUp() {
    this.body = {
      name: this.body.name,
      surname: this.body.surname,
      email: this.body.email,
      tel: this.body.tel,
      username: this.username
    }
  }
  static async getContact(id) {
    try {
      const contact = await ContactModel.findOne({ _id: id })
      return contact
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async getContacts(username) {
    try {
      const contacts = await ContactModel.find({
        username: { $exists: true },
        username
      })
      return contacts
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async delete(id) {
    if (!id) return null
    return await ContactModel.deleteOne({ _id: id })
  }
}

module.exports = Contact