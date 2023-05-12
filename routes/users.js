const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const verif = require("../middleware/verifyLogin.js");
const loginController = require("../controller/users");

router.post("/login", async (req, res) => {
  loginController.login(req, res);
});

router.get("/data", async (req, res) => {
  loginController.tte(req, res);
});

module.exports = router;
