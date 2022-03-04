const categoryController= require('../controllers/categoryController');
const express= require('express');
const router= express.Router();

router.post('/api/v1/add/category',categoryController.addCategory);
router.get('/api/v1/category',categoryController.getCategory);
module.exports= router;