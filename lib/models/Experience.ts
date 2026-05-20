import { Schema, Document, models, model } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  focus: string[];
  desc: string;
  current: boolean;
  order: number;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role:    { type: String, required: true },
    company: { type: String, required: true },
    period:  { type: String, required: true },
    focus:   { type: [String], default: [] },
    desc:    { type: String, default: "" },
    current: { type: Boolean, default: false },
    order:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = models.Experience || model<IExperience>("Experience", ExperienceSchema);
