const express = require("express");
const userControllers = require("../controllers/user-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post('/signup',  [check("email").isEmail(), check("password").isLength({ min: 5 }), check("name").exists().notEmpty(),check("userName").exists().notEmpty()],userControllers.signUp);

router.post('/login', [check("email").isEmail(), check("password").isLength({ min: 5 })], userControllers.logIn);

module.exports = router;