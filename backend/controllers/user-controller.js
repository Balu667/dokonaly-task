const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).send({error:"Invalid Inputs and does not match our pattern, Please check"})
    return next(
      new HttpError(
        "Invalid Inputs and does not match our pattern, Please check",
        422
      )
    );
  }
  const { name, userName, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed, Please try again", 500));
  }

  if (hasUser) {
    // return res
    //   .status(422)
    //   .send({ error: "Email is already registered, Please Login" });
    const error = new HttpError(
      "Email is already registered, Please Login",
      422
    );
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    userName,
    password,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed, Please try again", 500));
  }

  res.status(201).json({ email: newUser.email, password: newUser.password });
};

const logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res
    //   .status(422)
    //   .send({
    //     error: "Invalid Inputs and does not match our pattern, Please check",
    //   });
    return next(
      new HttpError(
        "Invalid Inputs and does not match our pattern, Please check",
        422
      )
    );
  }
  const { email, password } = req.body;

  let identifyUser;

  try {
    identifyUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("login failed, something went wrong Please check")
    );
  }

  if (!identifyUser) {
    // return res
    //   .status(403)
    //   .send({ error: "Email is not registered, Plese register first" });
    return next(
      new HttpError("Email is not registered, Plese register first", 403)
    );
  }

  res.json({ user: identifyUser });
};

exports.logIn = logIn;
exports.signUp = signUp;
