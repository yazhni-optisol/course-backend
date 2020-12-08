const express = require('express');
const router = express.Router();

const { create,askedin,del } = require('../controllers/questioncontrol')

//questioncontrol

router.post('/create', create);
router.get('/askedin/:cid', askedin);
router.delete('/del/:qid', del);

module.exports=router;