const db = require("../../../database/databaseconfig");

const getAllTecnicos = async () => {
  return (
    await db.query(
      "SELECT t.*, u.username FROM tecnicos t " +
      "JOIN usuarios u ON t.usuarioid = u.usuarioid " +
      "WHERE t.ativo = true ORDER BY t.nome_completo ASC"
    )
  ).rows;
};

const getTecnicoByID = async (tecnicoIDPar) => {
  return (
    await db.query(
      "SELECT t.*, u.username FROM tecnicos t " +
      "JOIN usuarios u ON t.usuarioid = u.usuarioid " +
      "WHERE t.id_tecnico = $1 AND t.ativo = true",
      [tecnicoIDPar]
    )
  ).rows;
};

const insertTecnico = async (regPar) => {
  let linhasAfetadas = 0;
  let msg = "ok";
  // Usa transação
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    
    // 1. Atualiza a tabela usuarios
    const updateUsuarioQuery = "UPDATE usuarios SET is_tecnico = true WHERE usuarioid = $1";
    await client.query(updateUsuarioQuery, [regPar.usuarioid]);

    // 2. Insere na tabela tecnicos
    const insertTecnicoQuery = 
      "INSERT INTO tecnicos (usuarioid, nome_completo, email_contato, especialidade, nivel, ativo) " + 
      "VALUES ($1, $2, $3, $4, $5, $6)";
    linhasAfetadas = (
      await client.query(insertTecnicoQuery, [
        regPar.usuarioid,
        regPar.nome_completo,
        regPar.email_contato,
        regPar.especialidade,
        regPar.nivel || 'N1',
        regPar.ativo || true
      ])
    ).rowCount;

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    msg = "[mdlTecnicos|insertTecnico] " + error.detail;
    linhasAfetadas = -1;
  } finally {
    client.release();
  }
  return { msg, linhasAfetadas };
};

const updateTecnico = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE tecnicos SET " +
          "nome_completo = $2, " +
          "email_contato = $3, " +
          "especialidade = $4, " +
          "nivel = $5, " +
          "ativo = $6 " +
          "WHERE id_tecnico = $1",
        [
          regPar.id_tecnico,
          regPar.nome_completo,
          regPar.email_contato,
          regPar.especialidade,
          regPar.nivel,
          regPar.ativo
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlTecnicos|updateTecnico] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteTecnico = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Soft delete (desativa o técnico)
    linhasAfetadas = (
    await db.query(
      "UPDATE tecnicos SET ativo = false WHERE id_tecnico = $1",
      [regPar.id_tecnico]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlTecnicos|deleteTecnico] " + error.detail;
  linhasAfetadas = -1;
}
return { msg, linhasAfetadas };
};

module.exports = {
  getAllTecnicos,
  getTecnicoByID,
  insertTecnico,
  updateTecnico,
  deleteTecnico,
};