module.exports = (req, res, next) => {
  if(!req.session.user){
    req.flash("error", "Faça login para acessar a pagina.")
    res.redirect("/login/index")
    return
  }
  next()
}