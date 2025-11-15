const mdlUsuarios = require("../model/mdlUsuarios");

const getAllUsuarios = (req, res) =>
  (async () => {
    let registro = await mdlUsuarios.getAllUsuarios();
    res.json({ status: "ok", "registro": registro });
  })();

const getUsuarioByID = (req, res) =>
  (async () => {
    const usuarioID = parseInt(req.body.usuarioid);
    let registro = await mdlUsuarios.getUsuarioByID(usuarioID);
    res.json({ status: "ok", "registro": registro });
  })();

const insertUsuario = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlUsuarios.insertUsuario(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateUsuario = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlUsuarios.updateUsuario(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteUsuario = (request, res) =>
  (async () => {
    const reg = request.body;
    // Usando soft delete (deleted = true)
    let { msg, linhasAfetadas } = await mdlUsuarios.deleteUsuario(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllUsuarios,
  getUsuarioByID,
  insertUsuario,
  updateUsuario,
  deleteUsuario
};