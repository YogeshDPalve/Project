import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: true }
);

export const studentModel = model("Students", studentSchema);
