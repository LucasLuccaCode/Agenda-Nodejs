const UserModel = require("./UserModel")
const validator = require("validator")
const bcrypt = require("bcryptjs")

class Login {
  constructor(body){
    this.body = body
    this.errors = []
    this.user = null
  }
  async register(){
    await this.validate()
    if(this.errors.length) return

    const password = this.body.password
    const salt = bcrypt.genSaltSync()
    this.body.password = bcrypt.hashSync(this.body.password, salt)

    try {
      this.user = await UserModel.create(this.body)
      this.user.password = password
    } catch(e){
      this.errors.push("Falha ao tentar criar usuário!")
    }
  }
  async validate(){
    this.cleanData()
    this.checkIfValidEmail()
    await this.checkUsernameExist()
  }
  async checkUsernameExist(){
    try {
      const user = await UserModel.findOne({
        username: this.body.username
      })
      if(user) this.errors.push("Nome de usuário já existe!")
    }
    catch(err){
      console.log("Erro ao verificar existência de usuário")
    }
  }
  checkIfValidEmail(){
    const isValidEmail = validator.isEmail(this.body.email)
    if(!isValidEmail) this.errors.push("Email inválido!")
  }
  cleanData(){
    this.body = {
      username: this.body.username,
      email: this.body.email,
      password: this.body.password,
    }
  }
}

module.exports = Login