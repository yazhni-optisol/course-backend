const express = require('express');

const router = express.Router();
const passport = require('passport');
const { create, askedin, delete1 } = require('../controllers/questioncontrol');

passport.authenticate('jwt', { session: false });

router.post('/create', create);
router.get('/askedin/:courseID', askedin);
router.delete('/delete1/:questionID', delete1);

module.exports = router;
