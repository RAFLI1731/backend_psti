const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const verif = require("../middleware/verifyLogin.js");
const loginController = require("../controller/login");

router.post("/login", async (req, res) => {
  loginController.login(req, res);
});

router.get("/loginMenu/:npp", verif, async (req, res) => {
  loginController.loginMenu(req, res);
});

router.get("/tte/:npp", verify, async (req, res) => {
  loginController.tte(req, res);
});

router.get("/no_ktp/:npp", verify, async (req, res) => {
  loginController.no_ktp(req, res);
});

module.exports = router;
