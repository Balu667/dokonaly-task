const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");

const signUp = async (req, res, next) => {
  var status = 0;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({error:"Invalid Inputs and does not match our pattern, Please check",'status': status})
    // return next(
    //   new HttpError(
    //     "Invalid Inputs and does not match our pattern, Please check",
    //     422
    //   )
    // );
  }
  const { name, userName, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:"Signup failed, Please try again",'status': status})
    // return next(new HttpError("Signup failed, Please try again", 500));
  }

  if (hasUser) {
    return res
      .status(422)
      .send({ error: "Email is already registered, Please Login", 'status': status });
    // const error = new HttpError(
    //   "Email is already registered, Please Login",
    //   422
    // );
    // return next(error);
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
    return res.status(500).json({error:"Signup failed, Please try again",'status': status})
    // return next(new HttpError("Signup failed, Please try again", 500));
  }
  status = 1

  res.status(201).json({ data: {email: newUser.email, password: newUser.password},'status': status });
};

const logIn = async (req, res, next) => {
  const errors = validationResult(req);
  var status = 0;
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .send({
        error: "Invalid Inputs and does not match our pattern, Please check",
        'status': status
      });
    // return next(
    //   new HttpError(
    //     "Invalid Inputs and does not match our pattern, Please check",
    //     422
    //   )
    // );
  }
  const { email, password } = req.body;

  let identifyUser;

  try {
    identifyUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:"login failed, Please try again", 'status': status})
    // return next(
    //   new HttpError("login failed, something went wrong Please check")
    // );
  }

  if (!identifyUser) {
    return res
      .status(403)
      .send({ error: "Email is not registered, Plese register first", 'status': status });
    // return next(
    //   new HttpError("Email is not registered, Plese register first", 403)
    // );
  }

  if (identifyUser.password === password) {
    status = 1;
    let user = identifyUser.toObject({getters: true})
    res.json({ data: {...user}, 'status': status } );
  } else {
    status = 0;
    return res.status(401).json({error:"password and username mismatch, please enter correct creditials", 'status': status})
    // return next(
    //   new HttpError(
    //     "password and username mismatch, please enter correct creditials"
    //   )
    // );
  }



  // res.json({ data: {identifyUser, 'status': 1} });
};

exports.logIn = logIn;
exports.signUp = signUp;
