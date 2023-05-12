const client = require("../db/connection");
const requestResponse = require("../response");
const { suksesWithData, suksesJoinData } = require("../response");

exports.getsuratMasuk = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM surat_masuk WHERE untuk_npp = '${req.params.npp}' order by tgl_surat desc`
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

exports.getResponKoordinasi = async (req, res) => {
  console.log(req.params);
  var surat = [];
  try {
    const data = await client.query(
      `SELECT * FROM koordinasi WHERE tujuan_koordinasi_npp = '${req.params.npp}' order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;

    for (let i = 0; i < user.length; i++) {
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT * FROM surat_masuk WHERE id_sm = '${user[i].id_sm}' order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    console.log(surat);
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getsuratMasukNotif = async (req, res) => {
  const is_read = 0;
  try {
    const data = await client.query(
      `SELECT * FROM surat_masuk WHERE untuk_npp = '${req.params.npp}' AND is_read = '${is_read}' order by tgl_surat desc`
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

exports.getView = async (req, res) => {
  console.log(req.params);
  try {
    const data = await client.query(
      `SELECT * FROM view_atasan_bawahan WHERE npp_atasan = '${req.params.npp}'`
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

exports.disposisi = async (req, res) => {
  const {
    id_sm,
    pengirim_disposisi_npp,
    pengirim_disposisi_nama,
    tujuan_disposisi_nama,
    tujuan_disposisi_npp,
    isi_disposisi,
    sifat,
    batas_waktu,
    created_date,
  } = req.body;
  var id_suratMasuk = parseInt(id_sm);
  console.log(req.body);
  try {
    const data = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${pengirim_disposisi_npp}'`
    );
    var kode_jabatan = data.rows[0].kode_jabatan;
    console.log(kode_jabatan);

    const data1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan}'`
    );
    var nama_jabatan = data1.rows[0].nama_jabatan;
    console.log(nama_jabatan);

    console.log(tujuan_disposisi_npp);
    const dataa = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${tujuan_disposisi_npp}'`
    );
    var kode_jabatan1 = dataa.rows[0].kode_jabatan;
    console.log(kode_jabatan1);

    const dataa1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan1}'`
    );
    var nama_jabatan1 = dataa1.rows[0].nama_jabatan;
    console.log(nama_jabatan1);

    console.log(req.body);
    await client.query(
      `INSERT INTO "disposisi" ("pengirim_disposisi_kode_jabatan", "pengirim_disposisi_nama_jabatan", "tujuan_disposisi_kode_jabatan", "tujuan_disposisi_nama_jabatan", "id_sm", "tujuan_disposisi_npp", "pengirim_disposisi_npp", "pengirim_disposisi_nama", "tujuan_disposisi_nama", "isi_disposisi", "sifat", "batas_waktu", "created_date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        kode_jabatan,
        nama_jabatan,
        kode_jabatan1,
        nama_jabatan1,
        id_suratMasuk,
        tujuan_disposisi_npp,
        pengirim_disposisi_npp,
        pengirim_disposisi_nama,
        tujuan_disposisi_nama,
        isi_disposisi,
        sifat,
        batas_waktu,
        created_date,
      ]
    );
    res.json(requestResponse.success);
    return true;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.disposisikeBawah = async (req, res) => {
  const {
    id_sm,
    id_disposisi,
    pengirim_disposisi_npp,
    pengirim_disposisi_nama,
    tujuan_disposisi_nama,
    tujuan_disposisi_npp,
    isi_disposisi,
    sifat,
    batas_waktu,
    created_date,
  } = req.body;

  var str = id_sm;
  var arr = str.split("*");
  arr = arr.map(function (val) {
    return +val;
  });
  var idSM = arr[0];
  var idDISPOSISI = arr[1];

  var id_suratMasuk = parseInt(idSM);
  var id_dispos = parseInt(idDISPOSISI);
  console.log(id_suratMasuk);
  console.log(id_dispos);

  try {
    const data = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${pengirim_disposisi_npp}'`
    );
    var kode_jabatan = data.rows[0].kode_jabatan;
    console.log(kode_jabatan);

    const data1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan}'`
    );
    var nama_jabatan = data1.rows[0].nama_jabatan;
    console.log(nama_jabatan);

    console.log(tujuan_disposisi_npp);
    const dataa = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${tujuan_disposisi_npp}'`
    );
    var kode_jabatan1 = dataa.rows[0].kode_jabatan;
    console.log(kode_jabatan1);

    const dataa1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan1}'`
    );
    var nama_jabatan1 = dataa1.rows[0].nama_jabatan;
    console.log(nama_jabatan1);

    console.log(req.body);
    await client.query(
      `INSERT INTO "disposisi" ("id_parent_disposisi", "pengirim_disposisi_kode_jabatan", "pengirim_disposisi_nama_jabatan", "tujuan_disposisi_kode_jabatan", "tujuan_disposisi_nama_jabatan", "id_sm", "tujuan_disposisi_npp", "pengirim_disposisi_npp", "pengirim_disposisi_nama", "tujuan_disposisi_nama", "isi_disposisi", "sifat", "batas_waktu", "created_date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        id_dispos,
        kode_jabatan,
        nama_jabatan,
        kode_jabatan1,
        nama_jabatan1,
        id_suratMasuk,
        tujuan_disposisi_npp,
        pengirim_disposisi_npp,
        pengirim_disposisi_nama,
        tujuan_disposisi_nama,
        isi_disposisi,
        sifat,
        batas_waktu,
        created_date,
      ]
    );
    res.json(requestResponse.success);
    return true;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getDisposisi = async (req, res) => {
  const id_surat_masuk = parseInt(req.params.id_sm);
  console.log(id_surat_masuk);
  try {
    const data = await client.query(
      `SELECT * FROM disposisi WHERE id_sm = ${id_surat_masuk} AND (pengirim_disposisi_npp = '${req.params.pengirim_disposisi_npp}' OR tujuan_disposisi_npp = '${req.params.pengirim_disposisi_npp}') order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    const data2 = await client.query(
      `SELECT * FROM surat_masuk WHERE id_sm = ${id_surat_masuk} order by created_date desc`
    );

    const user2 = data2.rows;

    res.json(suksesJoinData(user, user2));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisi = async (req, res) => {
  try {
    console.log(req.params);
    var surat = [];
    const data = await client.query(
      `SELECT * FROM disposisi WHERE tujuan_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NOT NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    // console.log(user);

    for (let i = 0; i < user.length; i++) {
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT * FROM surat_masuk WHERE id_sm = '${user[i].id_sm}' order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    console.log(surat);
    console.log(user);
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisiCloseAtasan = async (req, res) => {
  var surat = [];
  try {
    const data = await client.query(
      `SELECT * FROM disposisi WHERE pengirim_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NOT NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;

    for (let i = 0; i < user.length; i++) {
      const id_surat = user[i].id_sm;
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT kode_jenis_surat FROM surat_masuk WHERE id_sm = ${id_surat} order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisiOpen = async (req, res) => {
  try {
    var surat = [];
    const data = await client.query(
      `SELECT * FROM disposisi WHERE tujuan_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    // console.log(user);

    for (let i = 0; i < user.length; i++) {
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT * FROM surat_masuk WHERE id_sm = '${user[i].id_sm}' order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisiAtasan = async (req, res) => {
  var surat = [];
  try {
    const data = await client.query(
      `SELECT * FROM disposisi WHERE tujuan_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    for (let i = 0; i < user.length; i++) {
      const id_surat = user[i].id_sm;
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT kode_jenis_surat FROM surat_masuk WHERE id_sm = ${id_surat} order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisiAtasanClose = async (req, res) => {
  var surat = [];
  try {
    const data = await client.query(
      `SELECT * FROM disposisi WHERE tujuan_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NOT NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    for (let i = 0; i < user.length; i++) {
      const id_surat = user[i].id_sm;
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT kode_jenis_surat FROM surat_masuk WHERE id_sm = ${id_surat} order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.ResponseDisposisiOpenAtasan = async (req, res) => {
  var surat = [];

  try {
    const data = await client.query(
      `SELECT * FROM disposisi WHERE pengirim_disposisi_npp = '${req.params.pengirim_disposisi_npp}' AND status IS NULL order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;

    for (let i = 0; i < user.length; i++) {
      const id_surat = user[i].id_sm;
      // console.log(user[i].id_sm);
      joinData = await client.query(
        `SELECT kode_jenis_surat FROM surat_masuk WHERE id_sm = ${id_surat} order by created_date desc`
      );
      //Verifying if the exists in the database
      const user1 = joinData.rows[0];
      // console.log(user1);
      surat.push(user1);
      // const count = animals.push(joinData.rows);
    }
    res.json(suksesJoinData(user, surat));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.PreviewSurat = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM surat_masuk WHERE id_sm = '${req.params.id_sm}' order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;

    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.PreviewSurat = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM surat_masuk WHERE id_sm = '${req.params.id_sm}' order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;

    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.jabatan = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user = data.rows;
    var jabatan = user[0].kode_jabatan;
    const data1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${jabatan}'`
    );
    const user1 = data1.rows;
    res.json(suksesWithData(user1));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.koordinasi = async (req, res) => {
  const {
    id_sm,
    pengirim_koordinasi_npp,
    pengirim_koordinasi_nama,
    tujuan_koordinasi_nama,
    tujuan_koordinasi_npp,
    isi_koordinasi,
    sifat,
    batas_waktu,
    created_date,
  } = req.body;
  var id_suratMasuk = parseInt(id_sm);
  console.log(req.body);
  try {
    const data = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${pengirim_koordinasi_npp}'`
    );
    var kode_jabatan = data.rows[0].kode_jabatan;

    const data1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan}'`
    );
    var nama_jabatan = data1.rows[0].nama_jabatan;
    console.log(data1);
    const dataa = await client.query(
      `SELECT * FROM master_personil WHERE npp = '${tujuan_koordinasi_npp}'`
    );
    var kode_jabatan1 = dataa.rows[0].kode_jabatan;

    const dataa1 = await client.query(
      `SELECT * FROM master_jabatan WHERE kode_jabatan = '${kode_jabatan1}'`
    );
    var nama_jabatan1 = dataa1.rows[0].nama_jabatan;
    await client.query(
      `INSERT INTO "koordinasi" ("pengirim_koordinasi_kode_jabatan", "pengirim_koordinasi_nama_jabatan", "tujuan_koordinasi_kode_jabatan", "tujuan_koordinasi_nama_jabatan", "id_sm", "tujuan_koordinasi_npp", "pengirim_koordinasi_npp", "pengirim_koordinasi_nama", "tujuan_koordinasi_nama", "isi_koordinasi", "sifat", "batas_waktu", "created_date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        kode_jabatan,
        nama_jabatan,
        kode_jabatan1,
        nama_jabatan1,
        id_suratMasuk,
        tujuan_koordinasi_npp,
        pengirim_koordinasi_npp,
        pengirim_koordinasi_nama,
        tujuan_koordinasi_nama,
        isi_koordinasi,
        sifat,
        batas_waktu,
        created_date,
      ]
    );
    res.json(requestResponse.success);
    return true;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getKoordinasi = async (req, res) => {
  const id_surat_masuk = parseInt(req.params.id_sm);
  try {
    const data = await client.query(
      `SELECT * FROM koordinasi WHERE id_sm = ${id_surat_masuk} AND (pengirim_koordinasi_npp = '${req.params.npp}' OR tujuan_koordinasi_npp = '${req.params.npp}') order by created_date desc`
    ); //Verifying if the exists in the database

    const data2 = await client.query(
      `SELECT * FROM surat_masuk WHERE id_sm = ${id_surat_masuk}`
    );
    const user = data.rows;
    const user2 = data2.rows;
    console.log(user2);
    res.json(suksesJoinData(user, user2));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getTujuanKoordinasi = async (req, res) => {
  console.log(req.params);
  try {
    const data = await client.query(
      `SELECT * FROM view_personil_aktif WHERE npp = '${req.params.npp}'`
    ); //Verifying if the exists in the database
    const user = data.rows;
    const npp = user[0].npp;
    const kode_div = user[0].kode_div;
    const kode_eselon_tipe_jabatan = user[0].kode_eselon_tipe_jabatan;
    const data1 = await client.query(
      `SELECT * FROM view_personil_aktif WHERE kode_eselon_tipe_jabatan = '${kode_eselon_tipe_jabatan}' AND kode_div = '${kode_div}' AND npp != '${npp}'`
    );
    const user2 = data1.rows;
    res.json(suksesWithData(user2));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.getAllKoordinasi = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM koordinasi order by created_date desc`
    ); //Verifying if the exists in the database
    const user = data.rows;
    console.log(req.params.npp);
    console.log(user);
    res.json(suksesWithData(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

exports.responseUserDisposisi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.body);
    console.log(id);
    await client.query(
      `UPDATE disposisi SET status = '${req.body.status}', respon_disposisi = '${req.body.respon_disposisi}', updated_status_date ='${req.body.updated_status_date}' WHERE id_disposisi = ${id}`
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

exports.readSuratMasuk = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    const id = parseInt(req.params.id);
    const is_read = 1;
    console.log(req.body);
    console.log(id);
    await client.query(
      `UPDATE surat_masuk SET is_read = '${is_read}' WHERE id_sm = ${id}`
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

exports.readKoordinasi = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const id = parseInt(req.params.id);
    const is_read = 1;
    console.log(req.body);
    console.log(id);
    await client.query(
      `UPDATE koordinasi SET is_read = '${is_read}' WHERE id_koordinasi = ${id}`
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

exports.getresponKoordinasiNotif = async (req, res) => {
  const is_read = 0;
  try {
    const data = await client.query(
      `SELECT * FROM koordinasi WHERE tujuan_koordinasi_npp = '${req.params.npp}' AND is_read = '${is_read}' order by created_date desc`
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
