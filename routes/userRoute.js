const express = require("express");
const { createUser, loginUser } = require("../controllers/userCtrl");

const router = express();

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
