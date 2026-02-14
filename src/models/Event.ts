import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  category: "Meeting" | "Conference" | "Personal" | "Workshop" | "Other";
  attendees: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
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

eventSchema.pre<IEvent>("save", function (next) {
  this.updatedAt = new Date();
});

export const Event: Model<IEvent> = mongoose.model("Event", eventSchema);
