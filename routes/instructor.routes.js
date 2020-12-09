const express = require('express');

const router = express.Router();
const passport = require('passport');
const { getAll } = require('../controllers/instructorcontrol');

passport.authenticate('jwt', { session: false });

router.get('/getAll/:userID', getAll);

module.exports = router;
