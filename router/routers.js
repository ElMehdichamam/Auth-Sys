const express = require('express');

const router = express.Router();

const { 
    getMe,
    loginController,
    registerController 
    } = require('../controller/userController');

const { validate,auth } = require('../middleware/middleware');

const validSchema = require('../middleware/validation');

// Register
router.post('/register',validate(validSchema),registerController);
// Log In
router.post('/login',validate(validSchema),loginController);
// get User
router.get('/me',auth,getMe);

module.exports = router;