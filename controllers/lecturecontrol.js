/* eslint-disable no-undef */
// const { Course, Lecture } = require('../models');
const db = require('../models/index');

// ============================================================================
// @route    POST: /api/lectures/create
// @desc     Create a lecture in a course
// @access   Private && Instructor
exports.create = async (req, res) => {
  if (req.user.role !== 'Instructor') res.status(401).send('Unauthorized');

  const exists = await db.Course.findByPk(req.body.courseID);
  if (!exists) res.status(400).json({ lecture: 'Course does not exist!' });

  let lecture = req.body;
  lecture.linkID = lecture.link.slice(32);
  lecture.sno = exists.no_of_Lectures;
  lecture = db.Lecture.build(lecture);
  lecture = await lecture.save();

  const update = {};
  update.$inc = {};
  update.$inc.no_of_Lectures = 1;
  await db.Course.update(exists.id, update, { new: true });
  res.json(lecture);
};

// ============================================================================
// @route    GET: /api/lectures/of/courseID
// @desc     Lectures of the given Course
// @access   Private
exports.lectureCourse = async (req, res) => {
  // get IDs of lectures:
  const { lectures } = await db.Course.findOne({
    where: { id: req.params.courseID },
    include: ['lectures'],
  });
  if (!lectures) res.status(404).json([]);

  res.json(lectures);
};

// ============================================================================
// @route    GET: /api/lectures/single/lectureID
// @desc     fetches the specified lecture
// @access   Private
exports.singleLecture = async (req, res) => {
  const lecture = await db.Lecture.findByPk(req.params.lectureID);

  if (lecture) res.json(lecture);
  else res.status(404).json({ lecture: 'Lecture not found!' });
};

// ============================================================================
// @route    DELETE: /api/lectures/:lectureID
// @desc     Deletes the specified lecture
// @access   Private && Instructor
exports.destroy = async (req, res) => {
  const lecture = await db.Lecture.findByPk(req.params.lectureID);

  if (!lecture) {
    res.status(404).json({ lecture: 'Lecture not found!' });
    return;
  }

  const course = await db.Course.findByPk(lecture.courseID);

  if (toString(course.instructorID) !== toString(req.user.id)) {
    res.status(404).json({ lecture: 'Unauthorized action!' });
    return;
  }

  await Lecture.destroy(lecture.id);
  res.json(lecture);
};
