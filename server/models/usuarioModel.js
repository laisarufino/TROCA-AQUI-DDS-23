// importa a configuração do banco
const db = require("../config/db.js")

module.exports = {
    // Busca o usuário na tabela, com o email fornecido
    buscarPorEmail: async (email) =>{
        try {
            // Query pra fazer a consulta no banco
            const query = 'SELECT * FROM usuarios WHERE email = ?'
            // Guarda o resultado da consulta na variável
            const [linhas] = await db.execute(query, [email])
            // Retorna pro controller o resultado, nesse caso o usuário encontrado
            return linhas[0]
        } catch (erro) {
            console.error("Erro ao buscar usuário por email:", erro.message)
            throw new Error("Falha ao buscar usuário no banco de dados")
        }
    }
    ,
    // CRUD
    // CREATE
    criarUsuario : async (nome, email, senha, telefone, foto, perfil) =>{
        try {
            // Query pra fazer a consulta no banco
            const query = `INSERT INTO usuarios (nome, email, senha, telefone, foto, perfil)
                           VALUES (?,?,?,?,?,?)`
            // Guarda o resultado da consulta na variável
            const [resultado] = await db.execute(query, [nome, email, senha, telefone, foto, perfil])
            // Retorna pro controller o resultado, nesse caso o id do usuário inserido
            return resultado.insertId
        } catch (erro) {
            console.error("Erro ao criar usuário:", erro.message)
            throw new Error("Falha ao criar usuário no banco de dados")
        }
    }
}