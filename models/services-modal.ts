import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: {
        values: ["Baby Care", "Elderly Care", "Emergency Care"],
        message: `"{VALUE}" is not supported. Category is either: Baby Care, Elderly Care, Emergency Care`,
      },
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Service must have a name"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Service must have a short description"],
    },
    description: {
      type: String,
      required: [true, "Service must have a description"],
    },
    pricePerHour: {
      type: Number,
      default: null,
    },
    pricePerDay: {
      type: Number,
      default: null,
    },
    pricePerTrip: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      required: [true, "Service must have an image"],
    },
    features: {
      type: [String],
      required: [true, "Service must have features"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
