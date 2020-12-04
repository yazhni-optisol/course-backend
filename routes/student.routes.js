const express = require('express');

const router = express.Router();
const{signup,signin,current,del}=require('../controllers/authcontrol')
const{enroll,enrolledin}=require('../controllers/usercontrol');
//user
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/current', current);
//router.post('/delete/:uid',del)

//Information
router.post('/enroll/:cid', enroll);
router.post('/enrolledin/:cid', enrolledin);




module.exports = router;
