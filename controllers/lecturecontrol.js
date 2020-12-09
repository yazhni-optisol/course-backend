const { Course, Lecture } = require('../models');

// ============================================================================
// @route    POST: /api/lectures/create
// @desc     Create a lecture in a course
// @access   Private && Instructor
exports.create = async (req, res) => {
  if (req.user.role !== 'Instructor') res.status(401).send('Unauthorized');

  const exists = await Course.findByPk(req.body.courseID);
  if (!exists) res.status(400).json({ lecture: 'Course does not exist!' });

  let lecture = req.body;
  lecture.linkID = lecture.link.slice(32);
  lecture.sno = exists.no_of_Lectures;
  lecture = new Lecture(lecture);
  lecture = await lecture.save();

  const update = {};
  update.$inc = {};
  update.$inc.no_of_Lectures = 1;
  await Course.update(exists.id, update, { new: true });
  res.json(lecture);
};

// ============================================================================
// @route    GET: /api/lectures/of/courseID
// @desc     Lectures of the given Course
// @access   Private
exports.lectureCourse = async (req, res) => {
  // get IDs of lectures:
  const { lectures } = await Course.findByPk(req.params.courseID).populate(
    'lectures',
  );

  if (!lectures) res.status(404).json([]);

  res.json(lectures);
};

// ============================================================================
// @route    GET: /api/lectures/single/lectureID
// @desc     fetches the specified lecture
// @access   Private
exports.singleLecture = async (req, res) => {
  const lecture = Lecture.findByPk(req.params.lectureID);

  if (lecture) res.json(lecture);
  else res.status(404).json({ lecture: 'Lecture not found!' });
};

// ============================================================================
// @route    DELETE: /api/lectures/:lectureID
// @desc     Deletes the specified lecture
// @access   Private && Instructor
exports.destroy = async (req, res) => {
  const lecture = await Lecture.findByPk(req.params.lectureID);

  if (!lecture) {
    res.status(404).json({ lecture: 'Lecture not found!' });
    return;
  }

  const course = await Course.findByPk(lecture.courseID);

  if (toString(course.iid) !== toString(req.user.id)) {
    res.status(404).json({ lecture: 'Unauthorized action!' });
    return;
  }

  await Lecture.destroy(lecture.id);
  res.json(lecture);
};
