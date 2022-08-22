module.exports = (req, res, next) => {
  res.locals.user = req.session.user
  res.locals.errors = req.flash("error")
  res.locals.success = req.flash("success")
  next()
}