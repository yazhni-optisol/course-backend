const { Question, Answer, User } = require('../models');
// ============================================================================
// @route    POST: /api/answers/create
// @desc     Post an answer
// @access   Private
exports.create = async (req, res) => {
  const exists = await Question.findByPk(req.body.questionID);
  if (!exists) res.status(400).json({ question: 'Question does not exist!' });

  let a = req.body;
  a.userID = req.user.id;
  a.sno = exists.no_of_Answers;
  a = new Answer(a);
  a = await a.save();

  const update = {};
  update.$inc = {};
  update.$inc.no_of_Answers = 1;
  await Question.update(exists.id, update, { new: true });
  res.json(a);
};

// ============================================================================
// @route    POST: /api/answers/of/questionID
// @desc     Get a list of all answers for a given question.
// @access   Private
exports.listAnswer = async (req, res) => {
  const { answers } = await Question.findByPk(req.params.questionID).populate(
    'answers',
    null,
    null,
    { sort: { sno: 1 } },
  );

  if (!answers) res.status(404).json([]);
  const result = [];

  // eslint-disable-next-line no-undef
  for (i = 0; i < answers.length; i++) {
    // eslint-disable-next-line no-undef
    const user = User.findByPk(answers[i].userID).select(
      'name email role profilePic -_id',
    );
    // eslint-disable-next-line no-undef
    const data = { ...answers[i].doc };
    data.user = { ...user.doc };
    result.push(data);
  }
  res.json(result);
};

// ============================================================================
// @route    DELETE: /api/answers/:answerID
// @desc     Deletes the specified course
// @access   Private && Instructor
exports.destroy = async (req, res) => {
  const answer = await Answer.findByPk(req.params.answerID);

  if (!answer) {
    res.status(404).json({ answer: 'Answer not found!' });
    return;
  }

  if (toString(answer.userID) !== toString(req.user.id)) {
    res.status(404).json({ answer: 'Unauthorized action!' });
    return;
  }

  await Answer.destroy(answer.id);
  res.json(answer);
};
