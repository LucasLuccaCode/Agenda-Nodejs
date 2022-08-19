exports.index = (req, res) => {
  res.render("login-registration")
}

exports.login = (req, res) => {
  res.send(req.body)
}

exports.registration = (req, res) => {
  res.send(req.body)
}