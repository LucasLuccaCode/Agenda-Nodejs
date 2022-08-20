const Login = require("../models/loginModel")

exports.index = (req, res) => {
  res.locals.errors = req.flash("error")
  const success = req.flash("success")
  res.locals.success = success
  res.render("login-registration", { 
    page: success.length ? "login" : "registration", 
    user: { 
      username: req.session.user ? req.session.user.username : "",
      password: req.session.user ? req.session.user.password : "" 
    } 
  })
}

exports.login = (req, res) => {
  res.send(req.body)
}

exports.registration = async (req, res) => {
  const login = new Login(req.body)
  await login.register()

  if(login.errors.length){
    req.flash("error", login.errors)
    req.session.save(() => res.redirect("back"))
    return 
  }
  req.session.user = login.user
  req.flash("success", "Usuário criado com sucesso!")
  req.session.save(() => res.redirect("back"))
  return 
}