// const { Instructor } = require('../models');
const db = require('../models/index');
// ============================================================================
// @route    GET: /api/instructors/id
// @desc     creates the instructor profile
// @access   Private
exports.getAll = async (req, res) => {
  const inst = await db.Instructor.findOne({ userID: req.params.userID });
  if (!inst) res.status(404).json({});
  else res.json(inst);
};
