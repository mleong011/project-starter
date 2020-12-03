const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
//const emailController = require('./emails.js');
const authController = require('./auth');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
//router.use('/emails', emailController);
router.use('/auth', authController);

module.exports = router;