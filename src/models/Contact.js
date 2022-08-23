const ContactModel = require("./ContactModel")
const validator = require("validator")

class Contact {
  constructor(body){
    this.body = body
    this.errors = []
    this.contact = null
  }
  async register(){
    await this.validate()
    if(this.errors.length) return
    ContactModel.create(this.body)
  }
  async edit(id){
    await this.validate()
    if(this.errors.length) return
    this.contact = await ContactModel.updateOne({ _id: id }, { $set: this.body })
  }
  async validate(){
    this.cleanUp()
    if(!validator.isEmail(this.body.email)) this.errors.push("Email inválido.")
  }
  cleanUp(){
    this.body = {
      name: this.body.name,
      surname: this.body.surname,
      email: this.body.email,
      tel: this.body.tel
    }
  }
  static async getContact(id){
    try {
      const contact = await ContactModel.findOne({ _id: id })
      return contact
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async delete(id){
    if(!id) return null
    return await ContactModel.deleteOne({ _id: id })
  }
}

module.exports = Contact