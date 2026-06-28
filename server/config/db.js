// Importa o módulo mysql para conectar ao banco
const mysql = require("mysql2/promise")

// Valida que as variáveis de ambiente do banco estão definidas
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
    console.error("Variáveis de ambiente do banco não definidas:", missingVars.join(', '))
    console.error("Verifique o arquivo .env na raiz do projeto")
}

// Cria uma pool de conexão, várias conexões de uma vez, para evitar erros no banco
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Onde o banco está hospedado
    user: process.env.DB_USER, // Usuário que farà a conexão
    password: process.env.DB_PASSWORD, // Senha do usuário
    database: process.env.DB_NAME, // Banco ao qual deseja se conectar,
    // Se todas conexões estiverem ocupadas, deixa o usuário esperando, sem dar erro
    waitForConnections: true, 
    // Quantidade máxima de conexões ao mesmo tempo
    connectionLimit: 10,
    // Máximo de lista de espera
    queueLimit: 0 // 0 = ilimitado
})

// Listener para erros de conexão no pool
pool.on('connection', (connection) => {
    connection.on('error', (erro) => {
        console.error("Erro na conexão do pool:", erro.message)
        if (erro.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error("Conexão com o banco foi perdida. Reconectando automaticamente...")
        }
    })
})

// Exporta as informações do banco, pros models utilizarem
module.exports = pool;