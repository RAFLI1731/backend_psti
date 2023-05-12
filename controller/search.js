const client = require("../db/connection");
const responseReturn = require("../response");

exports.searchSurat = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM surat_masuk where npp = '${req.params.npp}' AND  order by _id desc`
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
