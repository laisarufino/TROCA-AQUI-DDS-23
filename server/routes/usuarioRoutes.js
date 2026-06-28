// importação do módulo express
const express = require("express");
const router = express.Router();

// Importar o controller do usuario
const usuarioController = require("../controllers/usuarioController.js")

// Importar middlewares de autenticação e validação
const { verificarToken, verificarPerfil } = require("../middlewares/authMiddleware.js")
const { validarLogin } = require("../middlewares/validacaoMiddleware.js")

// Declaração das rotas do usuário
// ROTAS PÚBLICAS
// Envia os dados de login (com validação de entrada)
router.post("/login", validarLogin, usuarioController.login)

// Rota de saida
router.get("/logout", usuarioController.logout)

// ROTAS PRIVADAS (protegidas por autenticação)

// Obtém a lista de usuários (somente administrador)
router.get("/", verificarToken, verificarPerfil("administrador"), (req, res) => {
  res.json({ mensagem: "Peguei a lista de usuários" });
});

//Retornar a página de cadastro (somente administrador)
router.get("/cadastro", verificarToken, verificarPerfil("administrador"), (req, res) => {
  res.json({ mensagem: "Estou na página de cadastro" });
});


module.exports = router