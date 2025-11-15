const db = require("../../../database/databaseconfig");

const assignTecnico = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO chamado_tecnico (id_chamado, id_tecnico, data_atribuicao) " +
        "VALUES ($1, $2, default)",
        [regPar.id_chamado, regPar.id_tecnico]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlChamadoTecnico|assignTecnico] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const unassignTecnico = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "DELETE FROM chamado_tecnico " +
        "WHERE id_chamado = $1 AND id_tecnico = $2",
        [regPar.id_chamado, regPar.id_tecnico]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlChamadoTecnico|unassignTecnico] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const getTecnicosByChamado = async (chamadoIDPar) => {
  return (
    await db.query(
      "SELECT t.*, u.username " +
      "FROM tecnicos t " +
      "JOIN usuarios u ON t.usuarioid = u.usuarioid " +
      "JOIN chamado_tecnico ct ON t.id_tecnico = ct.id_tecnico " +
      "WHERE ct.id_chamado = $1",
      [chamadoIDPar]
    )
  ).rows;
};

const getChamadosByTecnico = async (tecnicoIDPar) => {
  return (
    await db.query(
      "SELECT c.* " +
      "FROM chamados c " +
      "JOIN chamado_tecnico ct ON c.id_chamado = ct.id_chamado " +
      "WHERE ct.id_tecnico = $1",
      [tecnicoIDPar]
    )
  ).rows;
};

module.exports = {
  assignTecnico,
  unassignTecnico,
  getTecnicosByChamado,
  getChamadosByTecnico
};