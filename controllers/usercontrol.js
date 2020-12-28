/* eslint-disable no-undef */
// const { Information, Course, Enroll, User } = require('../models');
const db = require('../models/index');

// ============================================================================
// @route    POST: /api/student/enroll/:courseID
// @desc     Enrolls a student to the given course
// @access   Private && Student
exports.enroll = async (req, res) => {
  if (req.user.role !== Information) res.status(401).send('Unauthorized');

  const exists = await db.Course.findByPk(req.params.courseID);
  if (!exists) res.status(400).json({ course: 'Course not found!' });

  let std = {};
  std.courseID = exists.id;
  std.userID = req.user.id;
  std = new Enroll(std);
  std = await std.save();

  const update = {};
  update.$inc = {};
  update.$inc.no_of_Students = 1;
  await Course.update(exists.id, update, { new: true });
  res.json({ success: true });
};

// ============================================================================
// @route    POST: /api/students/enrolledin/courseID
// @desc     Returns the students enrolled in the given course
// @access   Private
exports.enrolledin = async (req, res) => {
  const { studentIDs } = await db.Course.findOne({
    where: { id: req.params.courseID },
    include: ['students', 'userID'],
  });

  if (!studentIDs) res.status(404).json([]);

  const students = [];
  studentIDs.forEach(async (ID) => students.push(await User.findById(ID)));
  res.json(students);
};
