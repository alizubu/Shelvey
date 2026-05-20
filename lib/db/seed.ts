/**
 * Seed helper — called from API routes to ensure default docs exist.
 * Inserts one document if the collection is empty.
 */
import { connectDB } from "./mongoose";
import { Hero }       from "../models/Hero";
import { About }      from "../models/About";
import { Social }     from "../models/Social";
import { Seo }        from "../models/Seo";
import { Experience } from "../models/Experience";
import { Service }    from "../models/Service";

export async function seedDefaults() {
  try {
    await connectDB();
  } catch {
    // MONGODB_URI not set (e.g. during build). Skip seeding.
    return;
  }

  // One-document singletons
  if (!(await Hero.findOne()))    await Hero.create({});
  if (!(await About.findOne()))   await About.create({});
  if (!(await Social.findOne()))  await Social.create({});
  if (!(await Seo.findOne()))     await Seo.create({});

  // Multi-document collections
  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      { role: "R&D Executive",                company: "Hirdaramani Bangladesh", period: "Jan 2026 — Present", focus: ["Market Research","Digital Innovation","Growth Strategy"], desc: "Driving research and development initiatives to identify emerging digital market trends, optimize internal marketing technologies, and implement innovative growth strategies for the brand.", current: true,  order: 0 },
      { role: "Senior Digital Marketing Officer", company: "Golden Son Ltd.",         period: "2021 — Dec 2025",     focus: ["Full-Funnel Strategy","Performance Marketing"],              desc: "Led end-to-end digital marketing operations for a leading Bangladeshi manufacturer.",                                                                                                 current: false, order: 1 },
      { role: "Executive Advertisement",      company: "Dainik Purbokone",       period: "2018 — Nov 2021",     focus: ["Digital Ad Sales","News Media Monetization"],                 desc: "Managed executive-level advertising and digital monetization for a prominent regional news media outlet.",                                                                          current: false, order: 2 },
    ]);
  }

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
      { icon: "◈", title: "DIGITAL STRATEGY",     desc: "Audience research, channel planning, and campaign roadmaps aligned with business objectives and measurable KPIs.", order: 0 },
      { icon: "⬡", title: "SEO & SEM",             desc: "Technical and content SEO, keyword strategy, and paid search campaigns optimized for maximum ROI and ranking dominance.", order: 1 },
      { icon: "◉", title: "PERFORMANCE MARKETING", desc: "Data-driven paid media across Google, Meta, and programmatic — ruthlessly focused on conversions and cost efficiency.", order: 2 },
      { icon: "▦", title: "CONTENT MARKETING",     desc: "Blog strategy, social content, email sequences, and thought leadership that attract, engage, and convert audiences.", order: 3 },
      { icon: "⬟", title: "BRAND & SOCIAL",        desc: "Brand positioning, social media management, community building, and creative campaign direction for lasting impact.", order: 4 },
      { icon: "△", title: "ANALYTICS & CRO",       desc: "Funnel analysis, A/B testing, heatmaps, and conversion rate optimization to squeeze maximum value from traffic.", order: 5 },
    ]);
  }
}
