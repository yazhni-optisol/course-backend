const express = require('express');

const router = express.Router();
const passport = require('passport');
const {
  create, lectureCourse, singleLecture, destroy,
} = require('../controllers/lecturecontrol');

passport.authenticate('jwt', { session: false });

router.post('/create', create);
router.get('/lectureCourse/:courseID', lectureCourse);
router.get('/singleLecture/:lectureID', singleLecture);
router.delete('/destroy/:lectureID', destroy);

module.exports = router;
