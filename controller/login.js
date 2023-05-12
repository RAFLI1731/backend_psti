const bcrypt = require("bcrypt");
const client = require("../db/connection");
var jwt = require("jsonwebtoken");
const path = require("path");
const responseReturn = require("../response");

exports.login = async (req, res) => {
  console.log(__dirname);
  const { npp, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM tabel_user WHERE npp= $1;`, [
      npp,
    ]);
    const user = data.rows;
    let dataJson = user[0];
    const dataLogin = {
      npp: user[0].npp,
      nama: user[0].nama,
    };
    console.log(dataLogin);
    if (user.length === 0) {
      res.json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        console.log(password);
        console.log(user[0].password);
        if (err) {
          res.json({
            error: "Server error",
          });
        } else if (result === true) {
          res.json({
            code: 200,
            status: true,
            message: "Success",
            data: dataLogin,
            token: jwt.sign(dataLogin, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
          });
          // console.log(result)
        } else {
          //Declaring the errors
          if (result != true)
            res.json({
              code: 404,
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.loginMenu = async (req, res) => {
  const parameter = req.params.npp;
  try {
    var cari = parameter.indexOf("'");
    var cari2 = parameter.indexOf('"');
    // console.log(cari);
    // console.log(cari2);
    if (cari != -1 || cari2 != -1) {
      res.json({
        code: 401,
        error: "forbidden",
      });
    } else {
      const data = await client.query(
        `SELECT * FROM master_personil where npp = '${req.params.npp}'`
      ); //Verifying if the exists in the database
      const user = data.rows;
      if (parameter != user[0].npp) {
        res.json({
          code: 401,
          error: "forbidden",
        });
      } else {
        res.json(responseReturn.suksesWithData(user));
      }
    }
  } catch (err) {
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.tte = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM tanda_tangan_elektronik where npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user = data.rows;

    console.log(user);
    res.json(responseReturn.suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.no_ktp = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT no_ktp FROM master_personil where npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user = data.rows;

    console.log(user);
    res.json(responseReturn.suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
