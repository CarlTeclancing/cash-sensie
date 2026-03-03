import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    profile: {
      address: { type: String }, 
      occupation: { type: String }, 
      dateOfBirth: { type: Date }, 
      avatar: { type: String },
      bio: { type: String, maxlength: 500 },
      phone: { type: String },
    },

    settings: {
      currencies: [
        {
          type: String, 
        },
      ],
      heardAbout: {
        type: String, 
      },
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "light",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      language: {
        type: String,
        default: "en",
      },
      timezone: {
        type: String,
        default: "UTC",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
