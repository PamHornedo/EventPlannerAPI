import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    location: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Meeting", "Conference", "Personal", "Workshop", "Other"],
      default: "Other",
    },
    attendees: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

eventSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Event", eventSchema);
