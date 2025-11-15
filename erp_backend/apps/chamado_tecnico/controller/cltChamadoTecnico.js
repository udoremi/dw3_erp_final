const mdlChamadoTecnico = require("../model/mdlChamadoTecnico");

const assignTecnico = (request, res) =>
  (async () => {
    const reg = request.body; // Espera { id_chamado, id_tecnico }
    let { msg, linhasAfetadas } = await mdlChamadoTecnico.assignTecnico(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const unassignTecnico = (request, res) =>
  (async () => {
    const reg = request.body; // Espera { id_chamado, id_tecnico }
    let { msg, linhasAfetadas } = await mdlChamadoTecnico.unassignTecnico(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const getTecnicosByChamado = (req, res) =>
  (async () => {
    const chamadoID = parseInt(req.body.id_chamado);
    let registro = await mdlChamadoTecnico.getTecnicosByChamado(chamadoID);
    res.json({ status: "ok", "registro": registro });
  })();

const getChamadosByTecnico = (req, res) =>
  (async () => {
    const tecnicoID = parseInt(req.body.id_tecnico);
    let registro = await mdlChamadoTecnico.getChamadosByTecnico(tecnicoID);
    res.json({ status: "ok", "registro": registro });
  })();

module.exports = {
  assignTecnico,
  unassignTecnico,
  getTecnicosByChamado,
  getChamadosByTecnico
};