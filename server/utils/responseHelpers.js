const renderError = (res, statusCode, mensagem) => {
  res.status(statusCode).render('erro', { mensagem })
}

const handleServerError = (res) => {
  renderError(res, 500, "Erro interno no servidor")
}

module.exports = { renderError, handleServerError }
