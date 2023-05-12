const router = require("express").Router();
const tambahSurat = require("../controller/tambahSurat");
const verify = require("../middleware/verifyJwt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    console.log(req);
    cb(
      null,
      file.originalname
      // path.extname(file.originalname)
    );
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/tte");
  },
  filename: function (req, file, cb) {
    console.log(req);
    cb(
      null,
      file.originalname
      // path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const uploadGambar = multer({ storage: storage2 });

router.post("/uploadSurat/:div", upload.single("foto"), async (req, res) => {
  tambahSurat.uploadSurat(req, res);
});

router.post(
  "/uploadTTE/:npp",
  uploadGambar.single("foto"),
  async (req, res) => {
    tambahSurat.uploadTTE(req, res);
  }
);

router.put("/updateTTE/:npp", verify, async (req, res) => {
  tambahSurat.updateTTE(req, res);
});

router.post("/tambahSurat", async (req, res) => {
  tambahSurat.tambahSurat(req, res);
});

router.get("/jenisSurat", verify, async (req, res) => {
  tambahSurat.getJenisSurat(req, res);
});

router.get("/pengolah/:npp", verify, async (req, res) => {
  tambahSurat.getPengolah(req, res);
});

router.get("/tujuanKirim", verify, async (req, res) => {
  tambahSurat.getTujuanKirim(req, res);
});

module.exports = router;
