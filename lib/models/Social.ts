import { Schema, Document, models, model } from "mongoose";

export interface ISocial extends Document {
  facebook: string;
  instagram: string;
  github: string;
  linkedin: string;
  twitter: string;
  updatedAt: Date;
}

const SocialSchema = new Schema<ISocial>(
  {
    facebook:  { type: String, default: "https://facebook.com/shelveyelmodias" },
    instagram: { type: String, default: "https://instagram.com/shelveyelmodias" },
    github:    { type: String, default: "https://github.com/shelveyelmodias" },
    linkedin:  { type: String, default: "" },
    twitter:   { type: String, default: "" },
  },
  { timestamps: true }
);

export const Social = models.Social || model<ISocial>("Social", SocialSchema);
