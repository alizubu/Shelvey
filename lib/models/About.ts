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
  updatedAt: Date;
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
  },
  { timestamps: true }
);

export const About = models.About || model<IAbout>("About", AboutSchema);
