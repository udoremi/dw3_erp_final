const db = require("../../../database/databaseconfig");

const getAllChamados = async () => {
  return (
    await db.query(
      "SELECT c.*, u.username AS requisitante_nome " +
      "FROM chamados c JOIN usuarios u ON c.id_requisitante = u.usuarioid " +
      "ORDER BY c.data_abertura DESC"
    )
  ).rows;
};

const getChamadoByID = async (chamadoIDPar) => {
  return (
    await db.query(
      "SELECT c.*, u.username AS requisitante_nome " +
      "FROM chamados c JOIN usuarios u ON c.id_requisitante = u.usuarioid " +
      "WHERE c.id_chamado = $1",
      [chamadoIDPar]
    )
  ).rows;
};

const getChamadosByRequisitanteID = async (requisitanteIDPar) => {
  return (
    await db.query(
      "SELECT * FROM chamados WHERE id_requisitante = $1 " +
      "ORDER BY data_abertura DESC",
      [requisitanteIDPar]
    )
  ).rows;
};


const insertChamado = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO chamados " + 
        "(id_requisitante, titulo, descricao, status, prioridade, categoria) " +
        "VALUES ($1, $2, $3, $4, $5, $6)",
        [
          regPar.id_requisitante, // Vindo do token
          regPar.titulo,
          regPar.descricao,
          regPar.status || 'Aberto',
          regPar.prioridade || 'Baixa',
          regPar.categoria
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlChamados|insertChamado] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateChamado = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE chamados SET " +
          "titulo = $2, " +
          "descricao = $3, " +
          "data_fechamento = $4, " +
          "status = $5, " +
          "prioridade = $6, " +
          "categoria = $7 " +
          "WHERE id_chamado = $1",
        [
          regPar.id_chamado,
          regPar.titulo,
          regPar.descricao,
          regPar.data_fechamento, // Pode ser null
          regPar.status,
          regPar.prioridade,
          regPar.categoria
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlChamados|updateChamado] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteChamado = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Hard delete (DELETE FROM)
    linhasAfetadas = (
    await db.query(
      "DELETE FROM chamados WHERE id_chamado = $1",
      [regPar.id_chamado]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlChamados|deleteChamado] " + error.detail;
  linhasAfetadas = -1;
}
return { msg, linhasAfetadas };
};

module.exports = {
  getAllChamados,
  getChamadoByID,
  getChamadosByRequisitanteID,
  insertChamado,
  updateChamado,
  deleteChamado,
};