const express = require('express');
const router = express.Router();
const { enroll,enrolledin } = require('../controllers/usercontrol')



//usercontrol
router.post('/enroll', enroll);
router.post('/enrolledin', enrolledin);


module.exports=router;