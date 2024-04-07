import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      min: 4,
      max: 50,
    },
    password: {
      type: String,
      min: 6,
      max: 50,
    },
    username: {
      type: String,
      unique: true,
      min: 2,
      max: 50,
    },
    firstName: {
      type: String,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      min: 2,
      max: 50,
    },
    address: {
      type: String,
      min: 2,
      max: 50,
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const registerModel =
  mongoose.models.registers || mongoose.model("registers", registerSchema);
export default registerModel;
