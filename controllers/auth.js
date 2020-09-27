const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("./../models/usuario");
const { generarJWT } = require("../helpers/token");
const usuario = require("./../models/usuario");

const crearUsuario = async (req, res = response) => {
  try {
    const { email, nombre, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      res.status(400).json({
        ok: false,
        msg: "El email existe",
      });
    }

    const usuario = new Usuario(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      msg: "Usuario " + nombre + " Creado",
      usuario,
      token,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email o password no validos",
      });
    }
    // validar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña no es valida",
      });
    }

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: "Usuario " + usuarioDB.nombre,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const renewToken = async (req, res = response) => {
  try {
    const { uid } = req.uid;

    const token = await generarJWT(uid);
    const usuario = await Usuario.findOne({ uid });
    res.json({
      ok: true,
      usuario,
      token,
      uid: req.uid,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  crearUsuario,
  login,
  renewToken,
};
