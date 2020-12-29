const express = require('express');

const router = express.Router();
// eslint-disable-next-line import/order
const passport = require('passport');
const {
  signup,
  login,
  current,
  destroy,
} = require('../controllers/authcontrol');

passport.authenticate('jwt', { session: false });

router.post('/signup', signup);
router.post('/login', login);
router.post('/current', current);
router.post('/destroy/:userID', destroy);

module.exports = router;
