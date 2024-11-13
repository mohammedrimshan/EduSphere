const express = require('express');
const { signUp, login, sendOtp, verifyOtp,resendOtp } = require('../Controllers/userController');

const router = express.Router();

router
  .post('/signup', signUp)
  .post('/login', login)
  .post('/send-otp', sendOtp)
  .post('/verify-otp', verifyOtp)
  .post('/resend-otp',resendOtp)
 
module.exports = router;