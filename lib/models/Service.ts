import { Schema, Document, models, model } from "mongoose";

export interface IService extends Document {
  icon: string;
  title: string;
  desc: string;
  order: number;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    icon:  { type: String, required: true },
    title: { type: String, required: true },
    desc:  { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = models.Service || model<IService>("Service", ServiceSchema);
