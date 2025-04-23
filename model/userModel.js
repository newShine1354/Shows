import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    booked_shows: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Show",
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("User", UserSchema);
