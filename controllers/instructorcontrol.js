
    passport = require('passport');
const { Instructor } = require('../models');
// ============================================================================
//@route    GET: /api/instructors/id
//@desc     creates the instructor profile
//@access   Private
exports.getAll=
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const inst = await Instructor.findOne({ uid: req.params.uid });
        if(!inst)
            res.status(404).json({});
        else
            res.json(inst);
    }


