var jwt = require("jsonwebtoken");
var decode = require("jwt-decode");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json({ code: 401 });
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.json({ code: 402 });
    const bearerToken = req.headers.authorization;
    const tokenSplit = bearerToken.split(" ");
    const gabung = tokenSplit[1];
    const deco = decode(gabung);
    const npp = deco.npp;
    const bodyNpp = req.params.npp;
    // console.log(deco);
    // console.log(npp);
    // console.log(req.params.npp);
    if (npp == bodyNpp) {
      next();
    } else {
      res.json({ error: "forbidden" });
    }
  });
};
module.exports = verifyToken;
