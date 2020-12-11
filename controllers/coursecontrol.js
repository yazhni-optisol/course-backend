/* eslint-disable no-undef */
const {
  Course, Instructor, User,
} = require('../models');

// ============================================================================
// @route    POST: /api/courses/create
// @desc     creates the course
// @access   Private && Instructor
exports.create = async (req, res) => {
  if (req.user.role !== 'Instructor') res.status(401).send('Unauthorized');

  const course = req.body;
  const exists = await Course.findOne({ title: course.title });
  if (exists) res.status(400).json({ title: 'Title is already taken!' });

  course.instructorID = req.user.id;
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json(newCourse);
};

// ============================================================================
// @route    GET: /api/courses/createdby/userID
// @desc     returns the courses created by the instructor
// @access   Private
exports.createdby = async (req, res) => {
  const { courses } = await Instructor.findOne({ userID: req.params.userID })
    .include('courses', null, null, { sort: { date: -1 } });

  if (!courses) {
    res.status(404).json([]);
    return;
  }

  const result = [];
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < courses.length; i++) {
    const Inst = User.findByPk(courses[i].instructorID)
      .select('name email profilePic -_id');
    const data = courses[i];
    data.instructor = Inst;
    result.push(data);
  }
  res.json(result);
};

// ============================================================================
// @route    GET: /api/courses/courseID
// @desc     returns the course specified
// @access   Private
exports.specified = async (req, res) => {
  const course = await Course.findByPk(req.params.courseID);

  if (!course) res.status(404).json({ course: 'Course not found!' });

  res.json(course);
};

// ============================================================================
// @route    GET: /api/courses/suggested/:userID
// @desc     returns the list of all courses, sorted by the date created
// @access   Private
exports.suggested = async (req, res) => {
  const courses = await Course.find({});

  if (!courses) {
    res.status(404).json([]);
    return;
  }

  const result = [];
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < courses.length; i++) {
    const Inst = User.findByPk(courses[i].instructorID)
      .select('name email profilePic -_id');
    courses[i].instructor = Inst;
    result.push(courses[i]);
  }
  res.json(result);
};

// ============================================================================
// @route    DELETE: /api/courses/:courseID
// @desc     Deletes the specified course
// @access   Private && Instructor
exports.destroy = async (req, res) => {
  const course = await Course.findByPk(req.params.courseID);

  if (!course) {
    res.status(404).json({ course: 'Course not found!' });
    return;
  }

  if (toString(course.instructorID) !== toString(req.user.id)) {
    res.status(404).json({ course: 'Unauthorized action!' });
    return;
  }

  await Course.destroy(course.id);
  res.json(course);
};
