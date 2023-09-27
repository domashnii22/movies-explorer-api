const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require("http2").constants;
const Movie = require("../models/movie");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(HTTP_STATUS_OK).send({ data: movies }))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Некорректный запрос"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError("Фильм другого пользователя");
      }
      Movie.deleteOne(movie)
        .orFail(new Error("NotValidMovieId"))
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: "Фильм удалён" });
        })
        .catch((err) => {
          if (err.message === "NotValidMovieId") {
            next(new NotFoundError("Фильм не найден"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        next(new NotFoundError("Фильм не найден"));
      } else {
        next(err);
      }
    });
};
