const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  create, createdby, specified, suggested, destroy,
} = require('../controllers/coursecontrol');

passport.authenticate('jwt', { session: false });

router.post('/create', create);
router.get('/createdby/:userID', createdby);
router.get('specified/:courseID', specified);
router.get('/suggested/:userID', suggested);
router.delete('/destroy/:courseID', destroy);

module.exports = router;
