const client = require("../db/connection");
const requestResponse = require("../response");
const { suksesWithData, suksesJoinData } = require("../response");
const request = require("request");
const fs = require("fs");
const axios = require("axios");
const { json } = require("express");
const { sign } = require("jsonwebtoken");

//untuk yang open
exports.getSignSurat = async (req, res) => {
  console.log(req.params);
  const is_read = 0;
  try {
    const data = await client.query(
      `SELECT * FROM pengajuan_surat_keluar WHERE pengirim_npp = '${req.params.npp}' AND is_read = '${is_read}' order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    const data1 = await client.query(
      `SELECT * FROM tanda_tangan_elektronik where npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user1 = data1.rows;
    const td = user1[0];
    res.json(suksesJoinData(user, td));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

//untuk yang close
exports.getSignSuratClose = async (req, res) => {
  console.log(req.params);
  const is_read = 1;
  try {
    const data = await client.query(
      `SELECT * FROM pengajuan_surat_keluar WHERE pengirim_npp = '${req.params.npp}' AND is_read = '${is_read}' order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    console.log(user);
    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getDetailSign = async (req, res) => {
  console.log(req.params);
  try {
    const data = await client.query(
      `SELECT * FROM pengajuan_surat_keluar WHERE kode_pengajuan = '${req.params.kode_pengajuan}'`
    ); //Verifying if the exists in the database
    const user = data.rows;

    console.log(user);
    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getAja = async (req, res) => {
  const url = req.params.pdf;
  const url2 = req.params.divisi;
  const url3 = req.params.nameFile;
  console.log(url + url2 + url3);
  const name_file = req.params.nameFile;
  const name_divisi = req.params.divisi;
  var yourString = req.params.pdf;
  yourString = yourString.substring(1, yourString.length - 1);
  console.log(yourString);
  const id = yourString;
  var request = require("request"),
    username = "esign",
    password = "qwerty",
    auth = "Basic " + Buffer(username + ":" + password).toString("base64");

  var api = "https://e-sign.pindad.com/api/sign/download/" + id;

  var config = {
    method: "get",
    url: api,
    responseType: "arraybuffer",
    headers: {
      Authorization: auth,
    },
  };
  function random(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const kode = random(8);
  return new Promise((resolve, reject) => {
    axios(config).then(
      (response) => {
        var dir = "./assets/surat_keluar/" + name_divisi;
        var namePdf =
          "assets/surat_keluar/" + name_divisi + "/" + kode + "_" + name_file;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        let writeStream = fs.createWriteStream(namePdf, {
          recursive: true,
        });
        writeStream.once("open", (fd) => {
          writeStream.write(new Buffer.from(response.data, "binary"));
          writeStream.on("finish", () => {
            res.json(requestResponse.suksesWithData(namePdf));
          });
          writeStream.end();
        });
        resolve(response);
        console.log(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

exports.checkData = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM tanda_tangan_elektronik WHERE npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const check = data.rows;
    const user = check[0].visualisasi_tanda_tangan_elektronik;
    console.log("USER ACCOUNT");
    console.log(user);

    if (user == null) {
      console.log(requestResponse.not_found);
      res.json(requestResponse.not_found);
    } else {
      console.log(requestResponse.success);
      console.log(requestResponse.success);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.update = async (req, res) => {
  function kode_pengajuan_random(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  console.log(req.body.data);
  const kode = kode_pengajuan_random(8);
  const file = req.body.file;
  const id_ = req.params.id_sk;
  const status = parseInt(req.body.status);
  const is_read = parseInt(req.body.is_read);
  const data = JSON.parse(req.body.data);
  const kode_div_surat = data.kode_div;
  const kode_jenis_surat = data.kode_jenis_surat;
  const no_surat = data.no_surat;
  const tgl_surat = data.tgl_surat;
  const prioritas_surat = data.prioras_surat;
  const tujuan_kode_div = data.tujuan_kode_div;
  const tujuan_nama_div = data.tujuan_nama_div;
  const tujuan_npp = data.tujuan_npp;
  const tujuan_nama = data.tujuan_nama;
  const tujuan_kode_jabatan = data.tujuan_kode_jabatan;
  const tujuan_nama_jabatan = data.tujuan_nama_jabatan;
  const perihal = data.perihal;
  const keterangan = data.keterangan;
  const no_agenda = data.no_agenda;
  const pengolah_npp = data.pengolah_npp;
  const pengolah_nama = data.pengolah_nama;
  const pengolah_kode_jabatan = data.pengolah_kode_jabatan;
  const pengolah_nama_jabatan = data.pengolah_nama_jabatan;
  const pengirim_npp = data.pengirim_npp;
  const pengirim_nama = data.pengirim_nama;
  const pengirim_kode_jabatan = data.pengirim_kode_jabatan;
  const pengirim_nama_jabatan = data.pengirim_nama_jabatan;
  const lokasi_agenda = data.lokasi_agenda;
  const created_date = data.created_date;
  const tembusan = data.tembusan;
  const tgl_agenda = data.tgl_agenda;
  const signSurat = 1;
  const uid = kode;
  const uid_surat_masuk = kode_pengajuan_random(8);
  await client.query(
    `UPDATE pengajuan_surat_keluar SET status_approval = '${status}', is_read = '${is_read}' WHERE id_pengajuan_sk = ${id_}`
  );
  console.log(requestResponse.success);
  try {
    await client.query(
      `INSERT INTO "surat_keluar" ( "kode_div", "kode_jenis_surat", "no_surat", "tgl_surat", "prioritas_surat", "tujuan_kode_div", "tujuan_nama_div", "tujuan_npp", "tujuan_nama", "tujuan_kode_jabatan", "tujuan_nama_jabatan", "perihal", "file", "keterangan", "no_agenda", "tgl_agenda", "pengolah_npp", "pengolah_nama", "pengolah_kode_jabatan", "pengolah_nama_jabatan", "pengirim_npp", "pengirim_nama", "pengirim_kode_jabatan", "pengirim_nama_jabatan", "lokasi_agenda", "created_date", "tembusan", "sign", "uid") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`,
      [
        kode_div_surat,
        kode_jenis_surat,
        no_surat,
        tgl_surat,
        prioritas_surat,
        tujuan_kode_div,
        tujuan_nama_div,
        tujuan_npp,
        tujuan_nama,
        tujuan_kode_jabatan,
        tujuan_nama_jabatan,
        perihal,
        file,
        keterangan,
        no_agenda,
        tgl_agenda,
        pengolah_npp,
        pengolah_nama,
        pengolah_kode_jabatan,
        pengolah_nama_jabatan,
        pengirim_npp,
        pengirim_nama,
        pengirim_kode_jabatan,
        pengirim_nama_jabatan,
        lokasi_agenda,
        created_date,
        tembusan,
        signSurat,
        uid,
      ]
    );
    const data = await client.query(
      `SELECT id_sk FROM surat_keluar WHERE uid = '${uid}'`
    );

    const data1 = await client.query(
      `SELECT kode_div, div FROM view_personil_aktif WHERE npp = '${pengirim_npp}'`
    );

    console.log(data1.rows);
    const id_surat_keluar = data.rows[0].id_sk;
    const pengirim_kode_div = data1.rows[0].kode_div;
    const pengirim_nama_div = data1.rows[0].div;

    await client.query(
      `INSERT INTO "surat_masuk" ( "id_sk", "kode_div", "kode_jenis_surat", "no_surat", "tgl_surat", "prioritas_surat", "untuk_npp", "untuk_nama", "untuk_kode_jabatan", "untuk_nama_jabatan", "perihal", "file", "keterangan", "no_agenda", "tgl_agenda", "pengolah_npp", "pengolah_nama", "pengolah_kode_jabatan", "pengolah_nama_jabatan", "pengirim_npp", "pengirim_nama", "pengirim_kode_jabatan", "pengirim_nama_jabatan", "pengirim_kode_div", "pengirim_nama_div", "lokasi_agenda", "created_date", "tembusan", "sign", "uid") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)`,
      [
        id_surat_keluar,
        tujuan_kode_div,
        kode_jenis_surat,
        no_surat,
        tgl_surat,
        prioritas_surat,
        tujuan_npp,
        tujuan_nama,
        tujuan_kode_jabatan,
        tujuan_nama_jabatan,
        perihal,
        file,
        keterangan,
        no_agenda,
        tgl_agenda,
        pengolah_npp,
        pengolah_nama,
        pengolah_kode_jabatan,
        pengolah_nama_jabatan,
        pengirim_npp,
        pengirim_nama,
        pengirim_kode_jabatan,
        pengirim_nama_jabatan,
        pengirim_kode_div,
        pengirim_nama_div,
        lokasi_agenda,
        created_date,
        tembusan,
        signSurat,
        uid_surat_masuk,
      ]
    );

    res.json(requestResponse.success);
  } catch (error) {
    console.log(error);
  }
};

exports.reject = async (req, res) => {
  const id_ = req.params.id_sk;
  const status = parseInt(req.body.status);
  const is_read = parseInt(req.body.is_read);

  await client.query(
    `UPDATE pengajuan_surat_keluar SET status_approval = '${status}', is_read = '${is_read}' WHERE id_pengajuan_sk = ${id_}`
  );
  console.log(requestResponse.success);
};
