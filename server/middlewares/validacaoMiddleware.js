// Validates login input before reaching the controller
function validarLogin(req, res, next) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .render("erro", { mensagem: "Email e senha são obrigatórios" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .render("erro", { mensagem: "Formato de email inválido" });
  }

  if (typeof senha !== "string" || senha.length > 128) {
    return res
      .status(400)
      .render("erro", { mensagem: "Senha inválida" });
  }

  next();
}

module.exports = { validarLogin };
