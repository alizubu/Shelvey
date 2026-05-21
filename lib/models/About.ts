import { Schema, Document, models, model } from "mongoose";

export interface IDiscipline {
  _id?: string;
  icon: string;
  title: string;
  desc: string;
}

export interface IAbout extends Document {
  bio: string;
  location: string;
  email: string;
  yearsExp: number;
  companies: number;
  disciplines: IDiscipline[];
  skills: ISkill[];
  currentFocus: string[];
  updatedAt: Date;
}

export interface ISkill {
  label: string;
  percent: number;
  color: string;
}

const DisciplineSchema = new Schema<IDiscipline>({
  icon:  { type: String, required: true },
  title: { type: String, required: true },
  desc:  { type: String, required: true },
});

const AboutSchema = new Schema<IAbout>(
  {
    bio: {
      type: String,
      default:
        "I'm a Digital Marketing Specialist with a proven track record of leveraging analytics to drive measurable brand growth. Currently serving as an R&D Executive at Hirdaramani Bangladesh.",
    },
    location:   { type: String, default: "Chittagong, Bangladesh" },
    email:      { type: String, default: "shelveyelmodias@gmail.com" },
    yearsExp:   { type: Number, default: 7 },
    companies:  { type: Number, default: 3 },
    disciplines: { type: [DisciplineSchema], default: [
      { icon: "⬡", title: "SEO & SEM",            desc: "Technical search optimization, keyword mapping, and paid search strategies." },
      { icon: "◈", title: "Performance Marketing", desc: "High-ROI paid media across Google, Meta, and programmatic networks." },
      { icon: "▦", title: "Content Strategy",      desc: "Audience-focused content planning and thought leadership." },
      { icon: "◉", title: "Brand Growth",          desc: "Data-backed positioning, community building, and campaign direction." },
    ]},
    skills: { type: [{ label: String, percent: Number, color: String }], default: [
      { label: "SEO & Technical Optimization", percent: 95, color: "#39FF14" },
      { label: "Performance Marketing (Google/Meta)", percent: 92, color: "#39FF14" },
      { label: "Analytics & CRO", percent: 90, color: "#8BE9FD" },
      { label: "Content Strategy", percent: 85, color: "#F5A623" },
      { label: "Brand Growth & Social", percent: 88, color: "#BD93F9" },
    ]},
    currentFocus: { type: [String], default: [
      "Performance Growth",
      "SEO Scaling",
      "Conversion Optimization",
      "Brand Strategy",
    ]},
  },
  { timestamps: true }
);

export const About = models.About || model<IAbout>("About", AboutSchema);
