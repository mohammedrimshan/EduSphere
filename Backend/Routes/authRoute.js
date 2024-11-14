// authRoute.js
const express = require('express');
const router = express.Router();
const { googleAuth } = require('../Controllers/authController');  // Correct path to your controller

router.post("/google", googleAuth);
module.exports = router;
