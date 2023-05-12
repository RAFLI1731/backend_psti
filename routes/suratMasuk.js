const router = require("express").Router();
const suratMasuk = require("../controller/suratMasuk");
const verify = require("../middleware/verifyJwt");
const verif = require("../middleware/verifyLogin.js");

router.get("/getAllSuratMasuk/:npp", verif, async (req, res) => {
  suratMasuk.getsuratMasuk(req, res);
});

router.get("/getResponKoordinasi/:npp", verify, async (req, res) => {
  suratMasuk.getResponKoordinasi(req, res);
});

router.get("/getNotifSurat/:npp", verify, async (req, res) => {
  suratMasuk.getsuratMasukNotif(req, res);
});

router.get("/view/:npp", verify, async (req, res) => {
  suratMasuk.getView(req, res);
});

router.post("/insertDisposisi", verify, async (req, res) => {
  suratMasuk.disposisi(req, res);
});

router.post("/insertDisposisikeBawah", verify, async (req, res) => {
  suratMasuk.disposisikeBawah(req, res);
});

router.get(
  "/getDisposisi/:pengirim_disposisi_npp/:id_sm",
  verify,
  async (req, res) => {
    suratMasuk.getDisposisi(req, res);
  }
);

router.get(
  "/responsDisposisiClose/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisi(req, res);
  }
);

router.get(
  "/responsDisposisiCloseAtasan/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisiCloseAtasan(req, res);
  }
);

router.get(
  "/responsDisposisiAtasanOpen/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisiOpenAtasan(req, res);
  }
);

router.get(
  "/responsDisposisiOpen/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisiOpen(req, res);
  }
);

router.get(
  "/responsDisposisiAtasan/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisiAtasan(req, res);
  }
);

router.get(
  "/responsDisposisiAtasanClose/:pengirim_disposisi_npp",
  verify,
  async (req, res) => {
    suratMasuk.ResponseDisposisiAtasanClose(req, res);
  }
);

router.get("/previewSurat/:id_sm", verify, async (req, res) => {
  suratMasuk.PreviewSurat(req, res);
});

router.get("/jabatan/:npp", verify, async (req, res) => {
  suratMasuk.jabatan(req, res);
});

router.post("/insertKoordinasi", verify, async (req, res) => {
  suratMasuk.koordinasi(req, res);
});

router.get("/getKoordinasi/:npp/:id_sm", verify, async (req, res) => {
  suratMasuk.getKoordinasi(req, res);
});

router.get("/getTujuanKoordinasi/:npp", verify, async (req, res) => {
  suratMasuk.getTujuanKoordinasi(req, res);
});

router.get("/getAllKoordinasi", verify, async (req, res) => {
  suratMasuk.getAllKoordinasi(req, res);
});

router.put("/updatetDisposisi/:id", verify, async (req, res) => {
  suratMasuk.responseUserDisposisi(req, res);
});

router.put("/updatetRead/:id", verify, async (req, res) => {
  suratMasuk.readSuratMasuk(req, res);
});

router.put("/updatetReadKoordinasi/:id", verify, async (req, res) => {
  suratMasuk.readKoordinasi(req, res);
});

router.get("/getNotifResponKoordinasi/:npp", verify, async (req, res) => {
  suratMasuk.getresponKoordinasiNotif(req, res);
});

module.exports = router;
