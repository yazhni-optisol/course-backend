const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  signup, signin, current, destroy,
} = require('../controllers/authcontrol');

passport.authenticate('jwt', { session: false });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/current', current);
router.post('/destroy', destroy);

module.exports = router;
