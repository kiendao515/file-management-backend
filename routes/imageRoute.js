const imageController= require('../controllers/imageController');
const express= require('express');
const router= express.Router();

router.post('/api/v1/add/image',imageController.addImage);
module.exports= router;