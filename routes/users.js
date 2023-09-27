const router = require("express").Router();
const { editUserData, getMeUser } = require("../controllers/users");
const { validationEditUserData } = require("../utils/validation");

router.get("/me", getMeUser);

router.patch("/me", validationEditUserData, editUserData);

module.exports = router;
