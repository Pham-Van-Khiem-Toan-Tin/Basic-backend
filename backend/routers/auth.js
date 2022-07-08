const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { loginCheck, isAuth, isAdmin } = require("../middlewares/auth");

router.post("/isadmin", authController.isAdmin);
router.post("/signup", authController.postSignUp);
router.post("/signin", authController.postSignIn);
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;
