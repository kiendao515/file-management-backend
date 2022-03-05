const userController= require('../controllers/userController');
const imageController= require('../controllers/imageController');
const express= require('express');
const router= express.Router();

/**
 *  cac chuc nang cua normal user 
 *  login
 *  register
 */
router.post('/api/v1/user/register',userController.register);
router.post('/api/v1/user/login',userController.login);
router.post('/api/v1/user/forgetpass',userController.forgetPass);
router.post('/api/v1/user/changepass/:id',userController.normalUserChangePass);
router.get('/api/v1/user/dashboard',imageController.getListImage);
router.post('/api/v1/user/category/filter',imageController.listDataFromFilter)
// ------ end user ------


module.exports= router;