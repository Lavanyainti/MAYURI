const express = require("express");
const { authAdmin } = require("../controller/loginController");
const router = express.Router();

router.post("/login", authAdmin);
module.exports=router;