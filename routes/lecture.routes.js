const express = require('express');
const router = express.Router();

const { create,of,single,del } = require('../controllers/lecturecontrol')

//questioncontrol

router.post('/create', create);
router.get('/of/:cid', of);
router.get('/single/:lid',single)
router.delete('/del/:lid',del)


module.exports=router;