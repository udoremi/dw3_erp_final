const db = require("../../../database/databaseconfig");
const bCrypt = require("bcryptjs");

const getAllUsuarios = async () => {
  return (
    await db.query(
      "SELECT usuarioid, username, is_tecnico, deleted FROM usuarios " +
      "WHERE deleted = false ORDER BY username ASC"
    )
  ).rows;
};

const getUsuarioByID = async (usuarioIDPar) => {
  return (
    await db.query(
      "SELECT usuarioid, username, is_tecnico, deleted FROM usuarios " +
      "WHERE usuarioid = $1 AND deleted = false",
      [usuarioIDPar]
    )
  ).rows;
};

const insertUsuario = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Hash da senha usando bCrypt
    const salt = bCrypt.genSaltSync(10);
    const hash = bCrypt.hashSync(regPar.password, salt);

    linhasAfetadas = (
      await db.query(
        "INSERT INTO usuarios (username, password, is_tecnico, deleted) " + 
        "values($1, $2, $3, $4)",
        [
          regPar.username,
          hash, // Salva a hash, não a senha
          regPar.is_tecnico || false, // Garante valor default
          regPar.deleted || false
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuarios|insertUsuario] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateUsuario = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Nota: Este update simples não inclui lógica para trocar senha.
    // Para trocar senha, seria necessário um endpoint separado ou lógica adicional
    linhasAfetadas = (
      await db.query(
        "UPDATE usuarios SET " +
          "username = $2, " +
          "is_tecnico = $3, " +
          "deleted = $4 " +
          "WHERE usuarioid = $1",
        [
          regPar.usuarioid,
          regPar.username,
          regPar.is_tecnico,
          regPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuarios|updateUsuario] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteUsuario = async (regPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // Soft delete
    linhasAfetadas = (
    await db.query(
      "UPDATE usuarios SET deleted = true WHERE usuarioid = $1",
      [regPar.usuarioid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlUsuarios|deleteUsuario] " + error.detail;
  linhasAfetadas = -1;
}
return { msg, linhasAfetadas };
};

module.exports = {
  getAllUsuarios,
  getUsuarioByID,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
};