const { findOne, insert } = require('../utils/dbHelpers')

module.exports = {
    buscarPorEmail: async (email) => {
        return findOne('SELECT * FROM usuarios WHERE email = ?', [email])
    },

    criarUsuario: async (nome, email, senha, telefone, foto, perfil) => {
        const query = `INSERT INTO usuarios (nome, email, senha, telefone, foto, perfil)
                       VALUES (?,?,?,?,?,?)`
        return insert(query, [nome, email, senha, telefone, foto, perfil])
    }
}
