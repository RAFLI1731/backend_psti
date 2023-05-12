const bcrypt = require("bcrypt");
const client = require("../db/connection");
var jwt = require("jsonwebtoken");
const path = require("path");
const responseReturn = require("../response");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);

    const user = data.rows;
    // console.log(user);
    let dataJson = user[0];

    if (user.length === 0) {
      res.json({
        code: 422,
        status: false,
        message: "Success",
        data: "User is not registered, Sign Up first",
      });
    } else {
      const dataLogin = {
        email: user[0].email,
        nama_lengkap: user[0].nama_lengkap,
        id_: user[0].id_,
        role: user[0].role,
        //   password: user[0].password,
      };
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.json({
            error: "Server error",
          });
        } else if (result === true) {
          console.log(responseReturn.success);
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
  const parameter = req.params.email;
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
        `SELECT * FROM master_personil where email = '${req.params.email}'`
      ); //Verifying if the exists in the database
      const user = data.rows;
      if (parameter != user[0].email) {
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
    const data = await client.query(`SELECT * FROM users`); //Verifying if the exists in the database
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
      `SELECT no_ktp FROM master_personil where email = '${req.params.email}'`
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
