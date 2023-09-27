const router = require("express").Router();
const { getMovies, addMovie, deleteMovie } = require("../controllers/movies");
const {
  validationAddMovie,
  validationDeleteMovie,
} = require("../utils/validation");

router.get("/", getMovies);

router.post("/movies", validationAddMovie, addMovie);

router.delete("/:movieId", validationDeleteMovie, deleteMovie);

module.exports = router;
