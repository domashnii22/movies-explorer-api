const { celebrate, Joi } = require("celebrate");
const { urlRegex } = require("./constants");

const validationEditUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationAddUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    })
    .unknown(true),
});

const validationLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    })
    .unknown(true),
});

const validationAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationEditUserData,
  validationLogin,
  validationAddUser,
  validationDeleteMovie,
  validationAddMovie,
};
