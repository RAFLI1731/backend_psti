const requestResponse = require("../response");
const response = require("../response");
const fs = require("fs");
const path = require("path");
const client = require("../db/connection");
const uploadSetting = require("../uploadConfig");

exports.tambahAplikasi = async (req, res) => {
  const imageName = uploadSetting.cekNull(req.files["image"]);
  console.log(imageName);
  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName,
  });
  const upload = data;

  try {
    if (imageName == null || imageName === undefined) {
      res.json(response.not_found);
      console.log(response.not_found);
    } else {
      await client.query(
        `INSERT INTO "aplikasi" ("nama_aplikasi", "deskripsi", "logo", "versi") VALUES ($1, $2, $3, $4)`,
        [upload.nama, upload.deskripsi, upload.image, upload.versi]
      );
      res.json(response.suksesWithData(upload));
      console.log(response.suksesWithData(upload));
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM aplikasi`);
    const Data = data.rows;
    console.log(res);
    res.json(response.suksesWithData(Data));
    console.log(response.suksesWithData(Data));
  } catch (error) {
    console.log(error);
  }
};
