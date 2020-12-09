const { Instructor } = require('../models');
// ============================================================================
// @route    GET: /api/instructors/id
// @desc     creates the instructor profile
// @access   Private
exports.getAll = async (req, res) => {
  const inst = await Instructor.findOne({ uid: req.params.userID });
  if (!inst) res.status(404).json({});
  else res.json(inst);
};
