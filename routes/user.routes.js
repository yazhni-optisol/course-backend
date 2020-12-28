const express = require('express');
const db = require('../models');

const router = express.Router();
// eslint-disable-next-line import/order
const passport = require('passport');
const {
  signup,
  signin,
  current,
  destroy,
} = require('../controllers/authcontrol');

passport.authenticate('jwt', { session: false });

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/current', current);
router.post('/destroy/:userID', destroy);
router.get('/sample', async (req, res) => {
  console.log(db);
  res.end();
});

module.exports = router;
