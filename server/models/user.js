const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contacts: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
  ],
});

const secretKey = crypto.randomBytes(32).toString("base64");

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: "7d" });
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (data) => {
  const schema = Joi.object({
    login: Joi.string().required().label("Login"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validateUser, secretKey };
