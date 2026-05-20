import { Schema, Document, models, model } from "mongoose";

export interface ISeo extends Document {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string;
  updatedAt: Date;
}

const SeoSchema = new Schema<ISeo>(
  {
    metaTitle:       { type: String, default: "Shelvey Elmo Dias — Digital Marketing Specialist" },
    metaDescription: { type: String, default: "Portfolio of Shelvey Elmo Dias — SEO & SEM Expert, Analytics & CRO Strategist." },
    ogTitle:         { type: String, default: "Shelvey Elmo Dias — Digital Marketing Specialist" },
    ogDescription:   { type: String, default: "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization." },
    ogImage:         { type: String, default: "" },
    keywords:        { type: String, default: "digital marketing, SEO, SEM, CRO, performance marketing, analytics, Bangladesh, Chittagong" },
  },
  { timestamps: true }
);

export const Seo = models.Seo || model<ISeo>("Seo", SeoSchema);
