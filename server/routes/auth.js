const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = require("express").Router();
const { User } = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    const token = newUser.generateAuthToken();

    res.status(201).send({
      data: { user: newUser, token },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res
      .status(200)
      .send({ data: { user, token }, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validateRegister = (data) => {
  const schema = Joi.object({
    login: Joi.string().required().label("Login"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
