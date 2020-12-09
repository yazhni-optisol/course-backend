const express = require('express');

const router = express.Router();
const passport = require('passport');
const { enroll, enrolledin } = require('../controllers/usercontrol');

passport.authenticate('jwt', { session: false });

router.post('/enroll', enroll);
router.post('/enrolledin', enrolledin);

module.exports = router;
