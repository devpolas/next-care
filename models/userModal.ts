import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a username"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: `"{VALUE}" is not supported, please use either "admin" or "user"`,
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
