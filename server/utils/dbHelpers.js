const db = require('../config/db')

const findOne = async (query, params) => {
  const [linhas] = await db.execute(query, params)
  return linhas[0]
}

const insert = async (query, params) => {
  const [resultado] = await db.execute(query, params)
  return resultado.insertId
}

const findAll = async (query, params) => {
  const [linhas] = await db.execute(query, params)
  return linhas
}

module.exports = { findOne, insert, findAll }
