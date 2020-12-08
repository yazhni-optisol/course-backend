const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/instructorcontrol')

//questioncontrol

router.get('/getAll/:uid', getAll);



module.exports=router;