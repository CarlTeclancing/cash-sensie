import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../model/userModel.js";

// Create JWT Token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error(
      "FATAL ERROR: JWT_SECRET is not defined in environment variables.",
    );
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Validate password strength
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  if (!hasUpperCase) {
    return {
      valid: false,
      message: "Password must contain an uppercase letter",
    };
  }
  if (!hasLowerCase) {
    return {
      valid: false,
      message: "Password must contain a lowercase letter",
    };
  }
  if (!hasNumbers) {
    return { valid: false, message: "Password must contain a number" };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      message: "Password must contain a special character",
    };
  }
  return { valid: true };
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      occupation,
      dateOfBirth,
      currencies,
      heardAbout,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      profile: {
        address,
        occupation,
        dateOfBirth,
      },
      settings: {
        currencies,
        heardAbout,
      },
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    console.log("Login Debug:", {
      passwordInput: !!password,
      userFound: !!user,
      hasPasswordHash: !!user.password,
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        settings: user.settings || {},
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile/settings (protected route)
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, settings, profile } = req.body;

    // Find user
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate email if changed
    if (email && email !== user.email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email",
        });
      }

      // Check if new email is already taken
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.email = email;
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update settings if provided
    if (settings && typeof settings === "object") {
      user.settings = { ...user.settings, ...settings };
    }

    // Update profile if provided
    if (profile && typeof profile === "object") {
      if (profile.address) user.profile.address = profile.address;
      if (profile.occupation) user.profile.occupation = profile.occupation;
      if (profile.dateOfBirth) user.profile.dateOfBirth = profile.dateOfBirth;
      if (profile.avatar) user.profile.avatar = profile.avatar;
      if (profile.bio) user.profile.bio = profile.bio;
      if (profile.phone) user.profile.phone = profile.phone;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        settings: user.settings || {},
        profile: user.profile || {},
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change password (protected route)
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    const user = await userModel.findById(req.userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

    // Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
