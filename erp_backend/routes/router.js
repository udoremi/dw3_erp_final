const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appUsuarios = require("../apps/usuarios/controller/cltUsuarios");
const appTecnicos = require("../apps/tecnicos/controller/cltTecnicos");
const appChamados = require("../apps/chamados/controller/cltChamados");
const appChamadoTecnico = require("../apps/chamado_tecnico/controller/cltChamadoTecnico");

routerApp.use((req, res, next) => {
    next();
});

routerApp.get("/", (req, res) => {
    res.send("Olá mundo, sistema de chamados!");
});

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

routerApp.get("/getAllUsuarios", appLogin.AutenticaJWT, appUsuarios.getAllUsuarios);
routerApp.post("/getUsuarioByID", appLogin.AutenticaJWT, appUsuarios.getUsuarioByID);
routerApp.post("/insertUsuario", appLogin.AutenticaJWT, appUsuarios.insertUsuario);
routerApp.post("/updateUsuario", appLogin.AutenticaJWT, appUsuarios.updateUsuario);
routerApp.post("/deleteUsuario", appLogin.AutenticaJWT, appUsuarios.deleteUsuario);

routerApp.get("/getAllTecnicos", appLogin.AutenticaJWT, appTecnicos.getAllTecnicos);
routerApp.post("/getTecnicoByID", appLogin.AutenticaJWT, appTecnicos.getTecnicoByID);
routerApp.post("/insertTecnico", appLogin.AutenticaJWT, appTecnicos.insertTecnico);
routerApp.post("/updateTecnico", appLogin.AutenticaJWT, appTecnicos.updateTecnico);
routerApp.post("/deleteTecnico", appLogin.AutenticaJWT, appTecnicos.deleteTecnico); 

routerApp.get("/getAllChamados", appLogin.AutenticaJWT, appChamados.getAllChamados);
routerApp.get("/getMyChamados", appLogin.AutenticaJWT, appChamados.getChamadosByRequisitante); 
routerApp.post("/getChamadoByID", appLogin.AutenticaJWT, appChamados.getChamadoByID);
routerApp.post("/insertChamado", appLogin.AutenticaJWT, appChamados.insertChamado); 
routerApp.post("/updateChamado", appLogin.AutenticaJWT, appChamados.updateChamado);
routerApp.post("/deleteChamado", appLogin.AutenticaJWT, appChamados.deleteChamado); 


routerApp.post("/assignTecnico", appLogin.AutenticaJWT, appChamadoTecnico.assignTecnico);
routerApp.post("/unassignTecnico", appLogin.AutenticaJWT, appChamadoTecnico.unassignTecnico);
routerApp.post("/getTecnicosByChamado", appLogin.AutenticaJWT, appChamadoTecnico.getTecnicosByChamado);
routerApp.post("/getChamadosByTecnico", appLogin.AutenticaJWT, appChamadoTecnico.getChamadosByTecnico);

module.exports = routerApp;