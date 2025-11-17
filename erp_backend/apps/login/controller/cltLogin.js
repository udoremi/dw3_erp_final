const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => {
    const credencial = await mdlLogin.GetCredencial(req.body.username);
    if (credencial.length == 0) {
        return res.status(200).json({ message: "Usuário não identificado!" });
    }

    if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
        //auth ok
        const username = credencial[0].username;
        const usuarioid = credencial[0].usuarioid;
        const is_tecnico = credencial[0].is_tecnico;

        const token = jwt.sign({ username, usuarioid, is_tecnico }, process.env.SECRET_API, {
            expiresIn: 600, // expires in 10min
        });
        // Retorna o token e os dados do usuário
        return res.json({ auth: true, token: token, username: username, usuarioid: usuarioid, is_tecnico: is_tecnico });
    }
    res.status(200).json({ message: "Login inválido!" });
};

function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader)
        return res
            .status(200)
            .json({ auth: false, message: "Não foi informado o token JWT" });

    const bearer = tokenHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
        if (err)
            return res
                .status(200)
                .json({ auth: false, message: "JWT inválido ou expirado" });

        req.usuarioid = decoded.usuarioid;
        req.username = decoded.username;
        req.is_tecnico = decoded.is_tecnico;
        next();
    });
}

const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};