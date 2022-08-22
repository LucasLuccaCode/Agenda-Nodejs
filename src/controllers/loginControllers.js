const { Register, Login } = require("../models/RegisterLogin")

exports.index = (req, res) => {
  res.render("login-register")
}

exports.register = async (req, res) => {
  const registration = new Register(req.body)
  await registration.register()

  if (registration.errors.length) {
    req.flash("error", registration.errors)
    req.session.save(() => res.redirect("back"))
    return
  }
  req.session.user = registration.user
  req.flash("success", "Usuário criado com sucesso!")
  req.session.save(() => res.redirect("back"))
  return
}

exports.login = async (req, res) => {
  const login = new Login(req.body)
  await login.login()
  console.log(login.errors.length)
  if (login.errors.length) {
    req.flash("error", login.errors)
    req.session.save(() => res.redirect("back"))
    return
  }
  req.session.user = login.user
  req.flash("success", "Logado com sucesso!")
  req.session.save(() => res.redirect(`/profile/${login.user.username}`))
}


exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/")
}