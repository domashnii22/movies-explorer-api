const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UnautorizedError = require("../errors/UnautorizedError");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: "Введите верный email",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, "Минимальная длина поля - 2"],
      maxlength: [30, "Максимальная длина поля - 30"],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnautorizedError("Неправильные почта или пароль");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnautorizedError("Неправильные почта или пароль");
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
