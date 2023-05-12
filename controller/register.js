const bcrypt = require("bcrypt");
const client = require("../db/connection");
const responseReturn = require("../response");
exports.register = async (req, res) => {
  const { nama, password, npp } = req.body;
  console.log(req.body);
  try {
    const data = await client.query(`SELECT * FROM tabel_user WHERE npp= $1;`, [
      npp,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          npp,
          nama,
          password: hash,
        };
        client.query(
          `INSERT INTO tabel_user (npp, nama, password) VALUES ('${user.npp}', '${user.nama}', '${user.password}')`,
          (err) => {
            res.json(responseReturn.success);
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};
