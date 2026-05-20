"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, SaveButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/AdminField";

interface Hero {
  name: string; title: string; subtitle: string; tagline: string;
  ctaPrimaryText: string; ctaPrimaryLink: string;
  ctaSecondaryText: string; ctaSecondaryLink: string;
  badgeText: string; location: string; statusText: string;
}

const DEFAULTS: Hero = {
  name: "SHELVEY ELMO DIAS",
  title: "Digital Marketing Specialist",
  subtitle: "SEO & SEM Expert | Analytics & CRO",
  tagline: "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization.",
  ctaPrimaryText: "VIEW WORK ↓",   ctaPrimaryLink: "about",
  ctaSecondaryText: "HIRE ME →",   ctaSecondaryLink: "contact",
  badgeText: "SED v1.0",           location: "CHT, BD",
  statusText: "ONLINE",
};

export default function HeroAdminPage() {
  const [data,   setData]   = useState<Hero>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...DEFAULTS, ...d }); })
      .catch(() => {/* use defaults */})
      .finally(() => setLoaded(true));
  }, []);

  const set = (k: keyof Hero) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Hero saved ✓"); else toast.error("Save failed — check MongoDB connection");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return (
    <div style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace", padding: "40px", letterSpacing: "0.1em" }}>
      LOADING ...
    </div>
  );

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 01"}</div>
        <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          HERO<span style={{ color: "#39FF14" }}>.edit</span>
        </h1>
      </div>

      <AdminSection title="IDENTITY" icon="▶">
        <AdminField label="FULL NAME">
          <AdminInput value={data.name} onChange={set("name")} placeholder="SHELVEY ELMO DIAS" />
        </AdminField>
        <AdminField label="TITLE" hint="line 2 in typewriter">
          <AdminInput value={data.title} onChange={set("title")} placeholder="Digital Marketing Specialist" />
        </AdminField>
        <AdminField label="SUBTITLE" hint="line 3 in typewriter">
          <AdminInput value={data.subtitle} onChange={set("subtitle")} placeholder="SEO & SEM Expert | Analytics & CRO" />
        </AdminField>
        <AdminField label="TAGLINE" hint="quote below terminal">
          <AdminTextarea value={data.tagline} onChange={set("tagline")} rows={3} />
        </AdminField>
      </AdminSection>

      <AdminSection title="CTA BUTTONS" icon="◈">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <AdminField label="PRIMARY TEXT">
            <AdminInput value={data.ctaPrimaryText} onChange={set("ctaPrimaryText")} placeholder="VIEW WORK ↓" />
          </AdminField>
          <AdminField label="PRIMARY LINK" hint="section id">
            <AdminInput value={data.ctaPrimaryLink} onChange={set("ctaPrimaryLink")} placeholder="about" />
          </AdminField>
          <AdminField label="SECONDARY TEXT">
            <AdminInput value={data.ctaSecondaryText} onChange={set("ctaSecondaryText")} placeholder="HIRE ME →" />
          </AdminField>
          <AdminField label="SECONDARY LINK" hint="section id">
            <AdminInput value={data.ctaSecondaryLink} onChange={set("ctaSecondaryLink")} placeholder="contact" />
          </AdminField>
        </div>
      </AdminSection>

      <AdminSection title="BADGE & STATUS" icon="⬡">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <AdminField label="BADGE TEXT">
            <AdminInput value={data.badgeText} onChange={set("badgeText")} placeholder="SED v1.0" />
          </AdminField>
          <AdminField label="LOCATION">
            <AdminInput value={data.location} onChange={set("location")} placeholder="CHT, BD" />
          </AdminField>
          <AdminField label="STATUS TEXT">
            <AdminInput value={data.statusText} onChange={set("statusText")} placeholder="ONLINE" />
          </AdminField>
        </div>
      </AdminSection>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
