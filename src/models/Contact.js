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
}

module.exports = Contact