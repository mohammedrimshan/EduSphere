const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(payload)
    const { email, name, picture, sub: googleId, email_verified } = payload;

    if (!email_verified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user with fields from Google
      user = new User({
        full_name: name,
        email,
        user_id: googleId, // Use Google ID as user_id
        googleId,
        profileImage: picture,
        is_verified: true // Since email is verified by Google
      });

      await user.save();
    } else if (!user.googleId) {
      // If user exists but doesn't have googleId, update it
      user.googleId = googleId;
      user.profileImage = picture;
      user.is_verified = true;
      await user.save();
    }

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token: authToken, user });
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};

module.exports = { googleAuth };