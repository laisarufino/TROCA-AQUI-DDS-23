const jwt = require("jsonwebtoken");

// Middleware that verifies the JWT token from cookies
// and attaches the decoded user info to req.usuario
function verificarToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (erro) {
    res.clearCookie("token");
    return res.status(401).redirect("/login");
  }
}

// Middleware that restricts access to specific profiles
function verificarPerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res
        .status(403)
        .render("erro", { mensagem: "Acesso negado: permissão insuficiente" });
    }
    next();
  };
}

module.exports = { verificarToken, verificarPerfil };
