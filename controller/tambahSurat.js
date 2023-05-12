const client = require("../db/connection");
const requestResponse = require("../response");
const { suksesWithData, suksesJoinData, success } = require("../response");
const fs = require("fs");
const path = require("path");

exports.tambahSurat = async function (req, res) {
  console.log(req.body);
  const {
    kode_jenis_surat,
    no_surat,
    tgl_surat,
    tujuan_npp,
    tujuan_nama,
    kode_div,
    div,
    kode_jabatan,
    nama_jabatan,
    perihal,
    filee,
    keterangan,
    pengirim_npp,
    pengirim_nama,
    pengirim_kode_jabatan,
    pengirim_nama_jabatan,
    lokasi_agenda,
    prioritas_surat,
    pengolah_npp,
    pengolah_nama,
    pengolah_kode_divisi,
    pengolah_nama_divisi,
    pengolah_kode_jabatan,
    pengolah_nama_jabatan,
    id_pengajuan_sk,
    kode_pengajuan,
    no_agenda,
    created_date,
    npp_tembusan,
    nama_tembusan,
    kode_div_tembusan,
    nama_divisi_tembusan,
    kode_jabatan_tembusan,
    nama_jabatan_tembusan,
  } = req.body;
  console.log(req.body);

  // const file = req.body.filee;
  const kode_div_surat = parseInt(pengolah_kode_divisi);
  const prioritas_surat_int = parseInt(prioritas_surat);
  const kode_div_tujuan = parseInt(kode_div);
  const kode_jabatan_tujuan = parseInt(kode_jabatan);
  const peng_kode_jabatan = parseInt(pengolah_kode_jabatan);
  const kirim_kode_jabatan = parseInt(pengirim_kode_jabatan);
  const kode_divisi_tembusan = parseInt(kode_div_tembusan);
  const kode_jabatann_tembusan = parseInt(kode_jabatan_tembusan);
  //jangan lupa assets nya dipanggil
  const tembusan = 0;
  const tembusan1 = 1;
  const nameFile = "surat_keluar/" + pengolah_nama_divisi + "/" + filee;
  console.log(nameFile);

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
  const kode = kode_pengajuan_random(16);
  try {
    await client.query(
      `INSERT INTO "pengajuan_surat_keluar" ( "kode_div", "kode_jenis_surat", "no_surat", "tgl_surat", "prioritas_surat", "tujuan_kode_div", "tujuan_nama_div", "tujuan_npp", "tujuan_nama", "tujuan_kode_jabatan", "tujuan_nama_jabatan", "perihal", "file", "keterangan", "no_agenda", "tgl_agenda", "pengolah_npp", "pengolah_nama", "pengolah_kode_jabatan", "pengolah_nama_jabatan", "pengirim_npp", "pengirim_nama", "pengirim_kode_jabatan", "pengirim_nama_jabatan", "lokasi_agenda", "created_date", "tembusan", "kode_pengajuan") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`,
      [
        kode_div_surat,
        kode_jenis_surat,
        no_surat,
        tgl_surat,
        prioritas_surat_int,
        kode_divisi_tembusan,
        nama_divisi_tembusan,
        npp_tembusan,
        nama_tembusan,
        kode_jabatann_tembusan,
        nama_jabatan_tembusan,
        perihal,
        nameFile,
        keterangan,
        no_agenda,
        tgl_surat,
        pengolah_npp,
        pengolah_nama,
        peng_kode_jabatan,
        pengolah_nama_jabatan,
        pengirim_npp,
        pengirim_nama,
        kirim_kode_jabatan,
        pengirim_nama_jabatan,
        lokasi_agenda,
        created_date,
        tembusan,
        kode_pengajuan,
      ]
    );
    await client.query(
      `INSERT INTO "pengajuan_surat_keluar" ( "kode_div", "kode_jenis_surat", "no_surat", "tgl_surat", "prioritas_surat", "tujuan_kode_div", "tujuan_nama_div", "tujuan_npp", "tujuan_nama", "tujuan_kode_jabatan", "tujuan_nama_jabatan", "perihal", "file", "keterangan", "no_agenda", "tgl_agenda", "pengolah_npp", "pengolah_nama", "pengolah_kode_jabatan", "pengolah_nama_jabatan", "pengirim_npp", "pengirim_nama", "pengirim_kode_jabatan", "pengirim_nama_jabatan", "lokasi_agenda", "created_date", "tembusan", "kode_pengajuan") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`,
      [
        kode_div_surat,
        kode_jenis_surat,
        no_surat,
        tgl_surat,
        prioritas_surat_int,
        kode_div_tujuan,
        div,
        tujuan_npp,
        tujuan_nama,
        kode_jabatan_tujuan,
        nama_jabatan,
        perihal,
        nameFile,
        keterangan,
        no_agenda,
        tgl_surat,
        pengolah_npp,
        pengolah_nama,
        peng_kode_jabatan,
        pengolah_nama_jabatan,
        pengirim_npp,
        pengirim_nama,
        kirim_kode_jabatan,
        pengirim_nama_jabatan,
        lokasi_agenda,
        created_date,
        tembusan1,
        kode,
      ]
    );
    res.json(success);
    console.log("suksesWithData");
  } catch (error) {
    console.log(error);
  }
};

exports.uploadSurat = async (req, res) => {
  const data_div = req.params.div;
  console.log(req.file);
  const file = req.file.originalname;
  const pathName = req.file.path;
  console.log(pathName);
  console.log(data_div);
  const nameFile = "assets/surat_keluar/" + data_div + "/" + file;
  // const dest = "";
  fs.rename(pathName, nameFile, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("rename success");
  });
  // fs.move(src, dest, (err) => {
  //   if (err) return console.log(err);
  //   console.log(`File successfully moved!!`);
  // });
};

exports.uploadTTE = async (req, res) => {
  console.log(req.file);
  const extension = path.extname(req.file.originalname);
  const file = req.file.originalname;
  const pathName = req.file.path;
  var status;
  console.log(pathName);
  const name = req.params.npp;
  const nameFile = "assets/tte/" + name + extension;
  // const dest = "";
  const nametoDb = "tte/" + name + extension;
  fs.rename(pathName, nameFile, (error) => {
    if (error) {
      console.log(error);
    }

    console.log("rename success");
    res.json(suksesWithData(nametoDb));
  });
};

exports.updateTTE = async (req, res) => {
  console.log(req.params.npp);
  console.log(req.body.file);
  const nppp = req.params.npp;

  try {
    await client.query(
      `UPDATE tanda_tangan_elektronik SET visualisasi_tanda_tangan_elektronik = '${req.body.file}' WHERE npp = '${nppp}'`
    );

    console.log(requestResponse.success);
    res.json(requestResponse.success);
    return true;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getJenisSurat = async (req, res) => {
  try {
    console.log(req.params);
    const data = await client.query(
      `SELECT kode_jenis_surat FROM master_jenis_surat`
    ); //Verifying if the exists in the database
    const user = data.rows;

    // console.log(user);
    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getTujuanKirim = async (req, res) => {
  try {
    console.log(req.params);
    const kode = 1;
    const data = await client.query(
      `SELECT * FROM view_personil_aktif WHERE kode_eselon LIKE '%1%'`
    ); //Verifying if the exists in the database
    const user = data.rows;

    // console.log(user);
    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getPengolah = async (req, res) => {
  try {
    console.log(req.params);
    const data = await client.query(
      `SELECT * FROM view_personil_admin WHERE npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user = data.rows;
    const kode_div = user[0]["kode_div"];

    const data1 = await client.query(
      `SELECT * FROM view_personil_aktif WHERE kode_div = '${kode_div}' AND kode_eselon LIKE '%1%'`
    );
    const user1 = data1.rows;
    console.log(user);
    console.log(user1);
    res.json(suksesJoinData(user, user1));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
