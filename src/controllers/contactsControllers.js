const ContactModel = require("../models/ContactModel")
const Contact = require("../models/Contact")

exports.index = (req, res) => {
  res.render("add-contact")
}

exports.register = async (req, res) => {
  const contact = new Contact(req.body)
  await contact.register()
  if(contact.errors.length){
    req.flash("error", contact.errors)
    req.session.save( () => res.redirect("back"))
    return
  }
  req.flash("success", "Contato adicionado.")
  req.session.save( () => res.redirect("back"))
}

exports.edit = (req, res) => {
  res.render("add-contact", { 
    action: "edit",
    id: req.query.id
  })
}

exports.update = async (req, res) => {
  try {
    const status = await ContactModel.updateOne({ id: req.query.id }, { $set: req.body })
    console.log(status)
    req.flash("success", "Contato atualizado.")
    req.session.save( () => res.redirect("back"))
    return
  } catch(err){
    console.log(err)
  }
  req.flash("error", "Erro ao atualizar contato.")
  req.session.save( () => res.redirect("back"))
}

exports.delete = async (req, res) => {
  try {
    const contact = await ContactModel.deleteOne({ id: req.params.id })
    console.log(contact)
    req.flash("success", "Contato removido.")
    req.session.save(() => res.redirect("back"))
    return
  } catch (err) {
    console(err)
    req.error("error", "Id de contado não encontrado.")
    req.session.save(() => res.redirect("back"))
    return
  }
}
