const usuarioModel = require("../models/usuarioModel.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const { renderError } = require('../utils/responseHelpers')

module.exports = {
    login: asyncHandler(async (req, res) => {
        const { email, senha } = req.body

        const usuario = await usuarioModel.buscarPorEmail(email)
        if (!usuario) return renderError(res, 404, "Credenciais inválidas")

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) return renderError(res, 404, "Credenciais inválidas")

        const token = jwt.sign(
            {id: usuario.id, perfil: usuario.perfil, nome: usuario.nome},
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )

        res.cookie('token', token, { httpOnly: true })

        if(usuario.perfil === "administrador") return res.redirect("/usuarios")
        if(usuario.perfil === "ofertante") return res.redirect("/produtos/meus-produtos")
        if(usuario.perfil === "interessado") return res.redirect("/produtos/vitrine")
    }),

    logout: (req, res) => {
        res.clearCookie('token')
        res.redirect("/login")
    }
}
