const jwt = require("jsonwebtoken");

const validatJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      res.status(401).json({
        ok: false,
        msg: "No hay token en la peticion",
      });
    }

    const { uid } = jwt.verify(token, process.env.JWT_SEED);
    req.uid = uid;

    next();
  } catch (error) {
    console.log("err", error);
    res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validatJWT,
};
