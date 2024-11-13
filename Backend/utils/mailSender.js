const nodemailer = require("nodemailer");

// Create a transport object using SMTP settings for Gmail
const mailSender = async (email, subject, htmlContent) => {
    try {
        // Create the transporter using SMTP settings
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,  // 587 is the default port for non-secure communication
            secure: false,  // Use true for port 465, false for port 587
            auth: {
                user: process.env.EMAIL_USER,  // Your Gmail address
                pass: process.env.EMAIL_PASSWORD,  // The app password (generated if 2FA is enabled)
            },
        });

        // Mail options
        const mailOptions = {
            from: `"EduSphere" <${process.env.EMAIL_USER}>`,  // Sender address
            to: email,  // Recipient address
            subject,  // Email subject
            html: htmlContent,  // HTML content
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

// OTP email template
const otpEmailTemplate = (otp) => {
    console.log("OTP is:", otp); // <-- This will print the OTP to the console
    return {
        subject: "Your EduSphere OTP Code",
        htmlContent: `
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Welcome to EduSphere!</h2>
                <h1>Your OTP is: ${otp}</h1><p>Please use this OTP to verify your email.</p>
                <p>This code will expire in 2 minutes. Please use it to complete your registration.</p>
            </div>
        `,
    };
};

module.exports = { mailSender, otpEmailTemplate };
