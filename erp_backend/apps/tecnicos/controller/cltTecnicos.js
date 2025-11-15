const mdlTecnicos = require("../model/mdlTecnicos");

const getAllTecnicos = (req, res) =>
  (async () => {
    let registro = await mdlTecnicos.getAllTecnicos();
    res.json({ status: "ok", "registro": registro });
  })();

const getTecnicoByID = (req, res) =>
  (async () => {
    const tecnicoID = parseInt(req.body.id_tecnico);
    let registro = await mdlTecnicos.getTecnicoByID(tecnicoID);
    res.json({ status: "ok", "registro": registro });
  })();

const insertTecnico = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlTecnicos.insertTecnico(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateTecnico = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlTecnicos.updateTecnico(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteTecnico = (request, res) =>
  (async () => {
    const reg = request.body;
    // Usando soft delete (ativo = false)
    let { msg, linhasAfetadas } = await mdlTecnicos.deleteTecnico(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllTecnicos,
  getTecnicoByID,
  insertTecnico,
  updateTecnico,
  deleteTecnico
};