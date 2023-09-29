const router = require("express").Router();
const { addUser } = require("../controllers/users");
const { validationAddUser } = require("../utils/validation");

router.post("/", validationAddUser, addUser);

module.exports = router;
