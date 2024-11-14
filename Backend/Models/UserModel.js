const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: function() { return !this.googleId; }, // Only required if not Google auth
      unique: true,
      sparse: true // Allows multiple null values
    },
    password: {
      type: String,
      required: function() { return !this.googleId; }, // Only required if not Google auth
    },
    user_id: {
      type: String,
      required: true,
      unique: true
    },
    googleId: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    courses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        enrollmentDate: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
        completionStatus: { type: Boolean, default: false }
      }
    ],
    wallet: {
      type: Number,
      default: 0,
      min: [0, "Wallet balance cannot be negative"]
    },
    is_verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Create indexes to optimize queries
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ user_id: 1 });
userSchema.index({ googleId: 1 });

module.exports = mongoose.model("User", userSchema);