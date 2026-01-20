import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },
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
      required: function () {
        return this.provider === "credentials";
      },
    },
    profileImage: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
    },
    role: {
      type: String,
      enum: {
        values: ["Admin", "Doctor", "Nurse", "Receptionist", "Patient"],
        message: `"{VALUE}" is not supported, please use either "admin" or "user"`,
      },
      default: "Patient",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
