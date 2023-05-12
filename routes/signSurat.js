const router = require("express").Router();
const signSurat = require("../controller/signSurat");
const verify = require("../middleware/verifyJwt");

router.get("/getSignSurat/:npp", verify, async (req, res) => {
  signSurat.getSignSurat(req, res);
});

router.get("/getSignSuratClose/:npp", verify, async (req, res) => {
  signSurat.getSignSuratClose(req, res);
});

router.get("/getDetail/:kode_pengajuan", verify, async (req, res) => {
  signSurat.getDetailSign(req, res);
});

router.get("/getaja/:pdf/:divisi/:nameFile", verify, async (req, res) => {
  signSurat.getAja(req, res);
});

router.put("/update/:id_sk", verify, async (req, res) => {
  signSurat.update(req, res);
});

router.put("/reject/:id_sk", verify, async (req, res) => {
  signSurat.reject(req, res);
});

router.get("/check/:npp", verify, async (req, res) => {
  signSurat.checkData(req, res);
});

module.exports = router;
