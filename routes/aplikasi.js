const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const verif = require("../middleware/verifyLogin.js");
const aplikasi = require("../controller/aplikasi");
const multer = require("multer");
const path = require("path");
const uploadSetting = require("../uploadConfig");
const fields = uploadSetting.upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
]);

router.post("/input", fields, async (req, res) => {
  aplikasi.tambahAplikasi(req, res);
});

router.get("/getData", async (req, res) => {
  aplikasi.getData(req, res);
});

module.exports = router;
