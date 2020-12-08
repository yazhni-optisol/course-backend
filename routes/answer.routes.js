const express = require('express');
const router = express.Router();

const { create,of ,del} = require('../controllers/answercontrol')

//questioncontrol

router.post('/create', create);
router.post('/of/:qid',of)
router.delete('/del/:aid',del)



module.exports=router;