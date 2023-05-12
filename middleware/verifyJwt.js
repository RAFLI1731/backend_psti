var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json({ code: 401 });
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.json({ code: 402 });
    // req.email = decoded.email
    next();
  });
};
module.exports = verifyToken;
