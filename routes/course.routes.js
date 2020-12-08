const express = require('express');
const router = express.Router();

const { create,createdby ,specified,suggested,del} = require('../controllers/coursecontrol')

//questioncontrol

router.post('/create', create);
router.get('/createdby/:uid',createdby)
router.get( 'specified/:cid',specified)
router.get( '/suggested/:uid',suggested)
router.delete('/del/:cid',del)



module.exports=router;