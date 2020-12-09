const express = require('express');

const router = express.Router();
const passport = require('passport');
const { create, listAnswer, destroy } = require('../controllers/answercontrol');

passport.authenticate('jwt', { session: false });

router.post('/create', create);
router.post('/listAnswer/:questionID', listAnswer);
router.delete('/destroy/:answerID', destroy);

module.exports = router;
