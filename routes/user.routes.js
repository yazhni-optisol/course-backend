const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authcontrol')

//authcontrol
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/current', signin);



module.exports=router;