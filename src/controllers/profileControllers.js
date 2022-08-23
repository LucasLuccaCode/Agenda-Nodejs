exports.index = async (req, res) => {
  res.locals.page = "profile"
  res.render("profile")
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/login/index")
}