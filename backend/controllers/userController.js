import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../model/userModel.js";
// import { storage } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";


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

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }


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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
        profile: user.profile || {},
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


const updateUserProfile = async (req, res) => {
  try {
    const { name, email, settings, profile } = req.body;

   
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

 
    if (email && email !== user.email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email",
        });
      }


      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.email = email;
    }

 
    if (name) {
      user.name = name;
    }

    if (settings && typeof settings === "object") {
      user.settings = { ...user.settings, ...settings };
    }

  
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

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }


    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

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

const logoutUser = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
//   try {
//     const { name, email, profile, settings } = req.body;

//     // Find the user
//     const user = await userModel.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Validate email if changed
//     if (email && email !== user.email) {
//       if (!validator.isEmail(email)) {
//         return res.status(400).json({
//           success: false,
//           message: "Please enter a valid email",
//         });
//       }

//       const emailExists = await userModel.findOne({ email });
//       if (emailExists && emailExists._id.toString() !== req.userId) {
//         return res.status(409).json({
//           success: false,
//           message: "Email already in use",
//         });
//       }
//       user.email = email;
//     }

//     // Update name if provided
//     if (name) {
//       user.name = name;
//     }

//     // Update profile fields if provided
//     if (profile && typeof profile === "object") {
//       if (profile.address !== undefined) user.profile.address = profile.address;
//       if (profile.occupation !== undefined) user.profile.occupation = profile.occupation;
//       if (profile.dateOfBirth !== undefined) user.profile.dateOfBirth = profile.dateOfBirth;
//       if (profile.bio !== undefined) user.profile.bio = profile.bio;
//       if (profile.phone !== undefined) user.profile.phone = profile.phone;
      
//       // Handle avatar upload from Firebase Storage URL
//       if (profile.avatar !== undefined) {
//         user.profile.avatar = profile.avatar;
//       }
//     }

//     // Update settings if provided
//     if (settings && typeof settings === "object") {
//       user.settings = { ...user.settings, ...settings };
//     }

//     await user.save();

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         settings: user.settings || {},
//         profile: user.profile || {},
//       },
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
};

const uploadProfileImage = async (req, res) => {
//   try {
//     const { image } = req.body;

//     if (!image) {
//       return res.status(400).json({
//         success: false,
//         message: "Image data is required",
//       });
//     }

//     // Check if image is a base64 data URL
//     const matches = image.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/);
//     if (!matches) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid image format. Please provide a base64 encoded image.",
//       });
//     }

//     const imageType = matches[1];
//     const base64Data = matches[2];
//     const imageBuffer = Buffer.from(base64Data, "base64");

//     // Generate unique filename
//     const filename = `profile-images/${req.userId}-${uuidv4()}.${imageType}`;

//     // Upload to Firebase Storage
//     const bucket = storage.bucket();
//     const file = bucket.file(filename);

//     await file.save(imageBuffer, {
//       metadata: {
//         contentType: `image/${imageType}`,
//       },
//       public: true,
//     });

//     // Get the public URL
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

//     res.json({
//       success: true,
//       message: "Image uploaded successfully",
//       imageUrl: publicUrl,
//     });
//   } catch (error) {
//     console.error("Upload profile image error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
};

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  logoutUser,
  updateProfile,
  uploadProfileImage,
};
