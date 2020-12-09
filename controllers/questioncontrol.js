/* eslint-disable no-undef */
const {
  Course, Question, User,
} = require('../models');

// ============================================================================
// @route    POST: /api/questions/create
// @desc     Ask a question
// @access   Private
exports.create = async (req, res) => {
  const exists = await Course.findByPk(req.body.courseID);
  if (!exists) res.status(400).json({ course: 'Course does not exist!' });

  let q = req.body;
  q.userID = req.user.id;
  q.sno = exists.no_of_Questions;
  q = new Question(q);
  q = await q.save();

  const update = {};
  update.$inc = {};
  update.$inc.no_of_Questions = 1;
  await Course.update(exists.id, update, { new: true });
  res.json(q);
};

// ============================================================================
// @route    GET: /api/questions/askedin/:courseID
// @desc     Get a list of questions asked in the given Course
// @access   Private
exports.askedin = async (req, res) => {
  const { questions } = await Course.findByPk(req.params.courseID).populate(
    'questions',
    null,
    null,
    { sort: { sno: 1 } },
  );

  if (!questions) res.status(404).json([]);

  const result = [];
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < questions.length; i++) {
    const user = User.findByPk(questions[i].userID).select(
      'name email role profilePic -_id',
    );
    const data = { ...questions[i].doc };
    data.user = { ...user.doc };
    result.push(data);
  }
  res.json(result);
};

// ============================================================================
// @route    DELETE: /api/questions/:questionID
// @desc     Deletes the specified course
// @access   Private && Instructor
exports.delete1 = async (req, res) => {
  const question = await Question.findByPk(req.params.questionID).populate('answers');

  if (!question) {
    res.status(404).json({ question: 'Question not found!' });
    return;
  }

  if (toString(question.userID) !== toString(req.user.id)) {
    res.status(404).json({ question: 'Unauthorized action!' });
    return;
  }

  const { answers } = question;
  if (answers) answers.forEach((a) => a.remove());

  await Question.destroy(question.id);
  res.json(question);
};
