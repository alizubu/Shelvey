import { Schema, Document, models, model } from "mongoose";

export interface IHero extends Document {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  badgeText: string;
  location: string;
  statusText: string;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    name:              { type: String, default: "SHELVEY ELMO DIAS" },
    title:             { type: String, default: "Digital Marketing Specialist" },
    subtitle:          { type: String, default: "SEO & SEM Expert | Analytics & CRO" },
    tagline:           { type: String, default: "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization." },
    ctaPrimaryText:    { type: String, default: "VIEW WORK ↓" },
    ctaPrimaryLink:    { type: String, default: "about" },
    ctaSecondaryText:  { type: String, default: "HIRE ME →" },
    ctaSecondaryLink:  { type: String, default: "contact" },
    badgeText:         { type: String, default: "SED v1.0" },
    location:          { type: String, default: "CHT, BD" },
    statusText:        { type: String, default: "ONLINE" },
  },
  { timestamps: true }
);

export const Hero = models.Hero || model<IHero>("Hero", HeroSchema);
