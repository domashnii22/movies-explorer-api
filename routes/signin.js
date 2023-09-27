const router = require("express").Router();
const { login } = require("../controllers/users");
const { validationLogin } = require("../utils/validation");

router.post("/", validationLogin, login);

module.exports = router;
