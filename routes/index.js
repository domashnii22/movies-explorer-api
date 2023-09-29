const router = require("express").Router();
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));

router.use(auth);

router.use("/users", require("./users"));
router.use("/movies", require("./movies"));

router.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
