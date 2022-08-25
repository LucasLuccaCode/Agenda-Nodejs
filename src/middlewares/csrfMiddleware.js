exports.setCsrfTokenMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.csrfErrorMiddleware = (err, req, res, next) => {
    console.log(err)
    if(err) return res.send("Erro de autenticidade do formulário")
    next()
}