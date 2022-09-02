const Contact = require("../models/Contact")

exports.index = async (req, res) => {
  res.locals.contact = { id: null }
  if (req.query.id) {
    const contact = await Contact.getContact(req.query.id)
    if (!contact) {
      req.flash("error", "Dados de contato inexistentes.")
      req.session.save(() => res.redirect("back"))
      return
    }
    res.locals.contact = contact
  }
  res.render("add-contact", { action: req.query.action })
}

exports.register = async (req, res) => {
  const contact = new Contact(req.body, req.session.user.username)
  await contact.register()
  if (contact.errors.length) {
    req.flash("error", contact.errors)
    req.session.save(() => res.redirect("back"))
    return
  }
  req.flash("success", "Contato adicionado.")
  req.session.save(() => res.redirect("back"))
}

exports.update = async (req, res) => {
  try {
    const contact = new Contact(req.body, req.session.user.username)
    await contact.edit(req.query.id)
    if (contact.errors.length) {
      req.flash("error", contact.errors)
      req.session.save(() => res.redirect("back"))
      return
    }

    req.flash("success", "Contato atualizado.")
    req.session.save(() => res.redirect("back"))
    return
  } catch (err) {
    console.log(err)
  }
  req.flash("error", "Erro ao atualizar contato.")
  req.session.save(() => res.redirect("back"))
}

exports.delete = async (req, res) => {
  try {
    const status = await Contact.delete(req.query.id)
    if (!status) return

    req.flash("success", "Contato apagado.")
    req.session.save(() => res.redirect("back"))
    return
  } catch (err) {
    console.log(err)
  }
  req.flash("error", "Erro ao tentar deletar contato.")
  req.session.save(() => res.redirect("back"))
}
