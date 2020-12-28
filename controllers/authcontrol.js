/* eslint-disable nonblock-statement-body-position */

/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretOrKey } = require('../keys/private');
const db = require('../models/index');
//= =========================================================================
/* For Signup first it check the validation and
then it check whether the email is already exit
or not if email is not exited it will encrypt the password and store to the database
//@route    POST: api/users/signup */

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = async (req, res) => {
  console.log(db);
  // eslint-disable-next-line object-curly-newline
  const { name, email, password, password2, gender, role } = req.body;
  const errors = [];
  // validation of signup
  if (!name) {
    errors.push({ name: 'required' });
  }

  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (!password2) {
    errors.push({
      password_confirmation: 'required',
    });
  }

  if (password !== password2) {
    errors.push({ password: 'mismatch' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  console.log(req.body);

  const user = await db.User.findOne({
    where: {
      email: req.body.email,
      role: req.body.role,
    },
  });
  if (user) return res.status(400).json({ email: 'Email already registered!' });

  const newUser = db.User.build({
    name,
    email,
    password,
    gender,
    role,
  });
  console.log(newUser);

  newUser.password = await bcrypt.hash(password, 10);
  await newUser.save();
  res.json(newUser);

  if (role === 'Instructor') {
    let newInst = db.Instructor.build({ userID: newUser.id });
    newInst = await newInst.save();
  } else {
    let newStd = db.Information.build({ userID: newUser.id });
    newStd = await newStd.save();
  }
};
//= ==========================================================
/* For signin the user it compare whether the email
and password are correct and
it generate the unique token for the user
//@route    POST: api/users/signin
//@desc     Login user and generate token
//@access   Public */

exports.signin = async (req, res) => {
  const { email, role, password } = req.body;
  const errors = [];
  // validation
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid email' });
  }
  if (!password) {
    errors.push({ passowrd: 'required' });
  }
  if (!role) {
    errors.push({ passowrd: 'required' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  const user = await db.User.findOne({
    where: {
      email: req.body.email,
      role: req.body.role,
    },
  });
  if (!user) return res.status(404).json({ email: 'User not found!' });

  const matched = await bcrypt.compare(password, user.password);
  // eslint-disable-next-line curly
  if (!matched)
    return res.status(400).json({ password: 'password incorrect!' });
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    role: user.role,
    profilePic: user.profilePic,
  };
  jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
    res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  });
};
//= =========================================================================
// @route    POST: api/users/current
// @desc     Return Current user
// @access   Private

// eslint-disable-next-line no-unused-expressions
exports.current = async (req, res) => {
  await res.json(req.user);
};

// ============================================================================
// @route    POST: /api/users/delete/:userID
// @desc     Deletes the specified course
// @access   Private && Instructor
exports.destroy = async (req, res) => {
  const user = await db.User.findByPk(req.params.userID);
  console.log(user, 'yyy');

  if (!user) {
    res.status(404).json({ user: 'User not found!' });
    return;
  }

  if (toString(user.id) !== toString(req.user.id)) {
    res.status(404).json({ user: 'Unauthorized action!' });
    return;
  }

  // eslint-disable-next-line no-undef
  await User.destroy(user.id);
  res.json(user);
};
