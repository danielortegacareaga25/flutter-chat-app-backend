/**
 * Path:
 */
const { Router, response } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validatJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El emial es obligatorio").not().isEmpty().isEmail(),
    check("password", "El password es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El emial es obligatorio").not().isEmpty().isEmail(),
    check("password", "El password es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    validarCampos,
  ],
  login
);

router.get("/renew", validatJWT, renewToken);
module.exports = router;
