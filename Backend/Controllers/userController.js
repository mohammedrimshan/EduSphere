const express = require("express");
const User = require("../Models/UserModel");
const otpSchema = require("../Models/otpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const cloudinary = require("../Config/cloudinaryConfig");
require("dotenv").config();
const { mailSender, otpEmailTemplate } = require("../utils/mailSender");

const generateUniqueUserID = async (prefix = "edusphereUser") => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const userId = `${prefix}${randomNumber}`;
  const exists = await User.findOne({ user_id: userId });
  return exists ? generateUniqueUserID(prefix) : userId;
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "E-mail already exists" });
    }

    // Generate a numeric OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number

    // Save the OTP in the database with email
    await otpSchema.create({ email, otp });

    // Prepare the email content (send the OTP as a number)
    const { subject, htmlContent } = otpEmailTemplate(otp); // Assuming otpEmailTemplate accepts numeric OTP
    await mailSender(email, subject, htmlContent); // Send OTP email

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Received OTP verification request:", { email, otp });

  try {
    // Find the OTP record from the database
    const otpRecord = await otpSchema.findOne({ email, otp });
    console.log("OTP record found:", otpRecord);

    if (!otpRecord) {
      console.log("Invalid or expired OTP for email:", email);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Instead of deleting, mark the OTP as used
    otpRecord.used = true;
    await otpRecord.save();
    console.log("OTP record marked as used");

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const securePassword = async (password) => bcrypt.hash(password, 10);


const signUp = async (req, res) => {
  console.log("Received signup request:", req.body);

  try {
    const { full_name, password, email, phone } = req.body;

    console.log("Checking if user already exists with email:", email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    console.log("Generating unique user ID");
    const userId = await generateUniqueUserID();

    console.log("Hashing password");
    const passwordHash = await securePassword(password);

    console.log("Creating new user");
    const newUser = await User.create({
      full_name,
      password: passwordHash,
      email,
      phone,
      user_id: userId,
    });

    console.log("New user created:", newUser);

    res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Resend OTP Controller
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if an existing OTP entry exists for this email
    const existingOtpRecord = await otpSchema.findOne({ email });

    // Generate a new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000);

    // Update the OTP if a record already exists, otherwise create a new record
    if (existingOtpRecord) {
      existingOtpRecord.otp = newOtp;
      await existingOtpRecord.save();
    } else {
      await otpSchema.create({ email, otp: newOtp });
    }

    // Send the new OTP via email
    const { subject, htmlContent } = otpEmailTemplate(newOtp);
    await mailSender(email, subject, htmlContent);

    // Response
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error in resendOtp:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    signUp,
    login,
    sendOtp,
    verifyOtp,
    resendOtp
}

// const forgetpassword = async (req,res)=>{
//     const {email} = req.body;
//     try{
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({message:"User Doesn't Exist"});
//         }
//         const resetToken = crypto.randomBytes(20).toString('hex');
//         user.resetPasswordToken = resetToken
//         user.userPasswordExpires = Date.now()+ 3600000;
//         await user.save();
//     }
// }