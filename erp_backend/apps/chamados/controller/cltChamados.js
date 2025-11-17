const mdlChamados = require("../model/mdlChamados");

// Função helper para formatar datas (como no seu exemplo 'cltAlunos')
function formatarDatas(registros) {
    if (!Array.isArray(registros)) registros = [registros];
    for (let i = 0; i < registros.length; i++) {
      const row = registros[i];
      if (row.data_abertura) {
        row.data_abertura = row.data_abertura.toISOString().split('T')[0];
      }
      if (row.data_fechamento) {
        row.data_fechamento = row.data_fechamento.toISOString().split('T')[0];
      }
    }
    return registros;
}

const getAllChamados = (req, res) =>
  (async () => {
    let registro = await mdlChamados.getAllChamados();
    registro = formatarDatas(registro);
    res.json({ status: "ok", "registro": registro });
  })();

const getChamadoByID = (req, res) =>
  (async () => {
    const chamadoID = parseInt(req.body.id_chamado);
    let registro = await mdlChamados.getChamadoByID(chamadoID);
    registro = formatarDatas(registro);
    res.json({ status: "ok", "registro": registro[0] || null });
  })();

// Rota para o usuário ver seus próprios chamados
const getChamadosByRequisitante = (req, res) =>
  (async () => {
    // Pega o ID do usuário logado (via JWT)
    const requisitanteID = req.usuarioid; 
    let registro = await mdlChamados.getChamadosByRequisitanteID(requisitanteID);
    registro = formatarDatas(registro);
    res.json({ status: "ok", "registro": registro });
  })();

const insertChamado = (request, res) =>
  (async () => {
    const reg = request.body;
    // Pega o ID do usuário logado (via JWT) e o define como requisitante
    reg.id_requisitante = request.usuarioid; 

    let { msg, linhasAfetadas } = await mdlChamados.insertChamado(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateChamado = (request, res) =>
  (async () => {
    const reg = request.body;
    let { msg, linhasAfetadas } = await mdlChamados.updateChamado(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteChamado = (request, res) =>
  (async () => {
    const reg = request.body;
    // Hard delete (conforme schema, sem campo 'deleted')
    let { msg, linhasAfetadas } = await mdlChamados.deleteChamado(reg);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllChamados,
  getChamadoByID,
  getChamadosByRequisitante,
  insertChamado,
  updateChamado,
  deleteChamado
};