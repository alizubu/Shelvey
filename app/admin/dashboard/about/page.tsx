"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, SaveButton, AddButton, DeleteButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea }              from "@/components/admin/AdminField";

interface Discipline { _id?: string; icon: string; title: string; desc: string; }
interface Skill { label: string; percent: number; color: string; }
interface About {
  bio: string; location: string; email: string;
  yearsExp: number; companies: number;
  disciplines: Discipline[];
  skills: Skill[];
  currentFocus: string[];
}

const DEFAULTS: About = {
  bio: "I'm a Digital Marketing Specialist with a proven track record of leveraging analytics to drive measurable brand growth.",
  location: "Chittagong, Bangladesh",
  email: "shelveyelmodias@gmail.com",
  yearsExp: 7,
  companies: 3,
  disciplines: [],
  skills: [
    { label: "SEO & Technical Optimization", percent: 95, color: "#39FF14" },
    { label: "Performance Marketing (Google/Meta)", percent: 92, color: "#39FF14" },
    { label: "Analytics & CRO", percent: 90, color: "#8BE9FD" },
    { label: "Content Strategy", percent: 85, color: "#F5A623" },
    { label: "Brand Growth & Social", percent: 88, color: "#BD93F9" },
  ],
  currentFocus: ["Performance Growth", "SEO Scaling", "Conversion Optimization", "Brand Strategy"],
};

export default function AboutAdminPage() {
  const [data,   setData]   = useState<About>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...DEFAULTS, ...d }); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("About saved ✓"); else toast.error("Save failed");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const setField = (k: keyof Omit<About, "disciplines" | "skills" | "currentFocus">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({
        ...prev,
        [k]: (k === "yearsExp" || k === "companies") ? Number(e.target.value) : e.target.value,
      }));

  // Discipline helpers
  const setDisc = (i: number, k: keyof Discipline, v: string) =>
    setData(prev => ({ ...prev, disciplines: prev.disciplines.map((d, idx) => idx === i ? { ...d, [k]: v } : d) }));
  const addDisc = () =>
    setData(prev => ({ ...prev, disciplines: [...prev.disciplines, { icon: "◈", title: "", desc: "" }] }));
  const delDisc = (i: number) =>
    setData(prev => ({ ...prev, disciplines: prev.disciplines.filter((_, idx) => idx !== i) }));

  // Skill helpers
  const setSkill = (i: number, k: keyof Skill, v: string | number) =>
    setData(prev => ({ ...prev, skills: prev.skills.map((s, idx) => idx === i ? { ...s, [k]: k === "percent" ? Number(v) : v } : s) }));
  const addSkill = () =>
    setData(prev => ({ ...prev, skills: [...prev.skills, { label: "", percent: 80, color: "#39FF14" }] }));
  const delSkill = (i: number) =>
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));

  // Focus helpers
  const setFocus = (i: number, v: string) =>
    setData(prev => ({ ...prev, currentFocus: prev.currentFocus.map((f, idx) => idx === i ? v : f) }));
  const addFocus = () =>
    setData(prev => ({ ...prev, currentFocus: [...prev.currentFocus, ""] }));
  const delFocus = (i: number) =>
    setData(prev => ({ ...prev, currentFocus: prev.currentFocus.filter((_, idx) => idx !== i) }));

  if (!loaded) return (
    <div style={{ color: "var(--color-text-dim)", padding: "40px", letterSpacing: "0.1em" }}>LOADING ...</div>
  );

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "0.62rem", color: "var(--color-accent)", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 02"}</div>
        <h1 style={{ fontSize: "1.3rem", color: "var(--color-text)", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          ABOUT<span style={{ color: "var(--color-accent)" }}>.edit</span>
        </h1>
      </div>

      {/* ── BIO ── */}
      <AdminSection title="BIO" icon="◉">
        <AdminField label="BIO TEXT" hint="displayed on about section">
          <AdminTextarea value={data.bio} onChange={setField("bio")} rows={5} />
        </AdminField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <AdminField label="LOCATION">
            <AdminInput value={data.location} onChange={setField("location")} placeholder="Chittagong, Bangladesh" />
          </AdminField>
          <AdminField label="EMAIL">
            <AdminInput type="email" value={data.email} onChange={setField("email")} placeholder="shelveyelmodias@gmail.com" />
          </AdminField>
          <AdminField label="YEARS EXPERIENCE">
            <AdminInput type="number" value={data.yearsExp} onChange={setField("yearsExp")} min={0} />
          </AdminField>
          <AdminField label="COMPANIES COUNT">
            <AdminInput type="number" value={data.companies} onChange={setField("companies")} min={0} />
          </AdminField>
        </div>
      </AdminSection>

      {/* ── DISCIPLINES ── */}
      <AdminSection title="CORE DISCIPLINES" icon="⬡" actions={<AddButton onClick={addDisc} label="ADD DISCIPLINE" />}>
        {data.disciplines.map((d, i) => (
          <div key={i} style={{ padding: "16px", border: "1px solid var(--color-border)", borderRadius: "6px", marginBottom: "12px", position: "relative" }}>
            <div style={{ position: "absolute", top: "12px", right: "12px" }}>
              <DeleteButton onClick={() => delDisc(i)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "12px", marginBottom: "12px" }}>
              <AdminField label="ICON">
                <AdminInput value={d.icon} onChange={e => setDisc(i, "icon", e.target.value)} placeholder="⬡" />
              </AdminField>
              <AdminField label="TITLE">
                <AdminInput value={d.title} onChange={e => setDisc(i, "title", e.target.value)} placeholder="SEO & SEM" />
              </AdminField>
            </div>
            <AdminField label="DESCRIPTION">
              <AdminTextarea value={d.desc} onChange={e => setDisc(i, "desc", e.target.value)} rows={2} />
            </AdminField>
          </div>
        ))}
        {data.disciplines.length === 0 && (
          <div style={{ color: "var(--color-text-dim)", fontSize: "0.72rem", padding: "20px 0", textAlign: "center" }}>
            No disciplines yet — click &quot;+ ADD DISCIPLINE&quot; above.
          </div>
        )}
      </AdminSection>

      {/* ── SKILLS / PROFICIENCY ── */}
      <AdminSection title="PROFICIENCY BARS" icon="▦" actions={<AddButton onClick={addSkill} label="ADD SKILL" />}>
        {data.skills.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 40px", gap: "10px", alignItems: "end", marginBottom: "12px" }}>
            <AdminField label={i === 0 ? "LABEL" : ""}>
              <AdminInput value={s.label} onChange={e => setSkill(i, "label", e.target.value)} placeholder="Skill name" />
            </AdminField>
            <AdminField label={i === 0 ? "%" : ""}>
              <AdminInput type="number" value={s.percent} onChange={e => setSkill(i, "percent", e.target.value)} min={0} max={100} />
            </AdminField>
            <AdminField label={i === 0 ? "COLOR" : ""}>
              <AdminInput value={s.color} onChange={e => setSkill(i, "color", e.target.value)} placeholder="#39FF14" />
            </AdminField>
            <div style={{ paddingBottom: "22px" }}>
              <DeleteButton onClick={() => delSkill(i)} />
            </div>
          </div>
        ))}
        {data.skills.length === 0 && (
          <div style={{ color: "var(--color-text-dim)", fontSize: "0.72rem", padding: "20px 0", textAlign: "center" }}>
            No skills yet — click &quot;+ ADD SKILL&quot; above.
          </div>
        )}
      </AdminSection>

      {/* ── CURRENT FOCUS ── */}
      <AdminSection title="CURRENT FOCUS" icon="◎" actions={<AddButton onClick={addFocus} label="ADD FOCUS" />}>
        {data.currentFocus.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ color: "var(--color-accent)", fontSize: "0.8rem" }}>◉</span>
            <input
              value={f}
              onChange={e => setFocus(i, e.target.value)}
              placeholder="Focus area..."
              style={{
                flex: 1,
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.82rem",
                padding: "8px 12px",
                outline: "none",
                borderRadius: "4px",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
            />
            <DeleteButton onClick={() => delFocus(i)} />
          </div>
        ))}
        {data.currentFocus.length === 0 && (
          <div style={{ color: "var(--color-text-dim)", fontSize: "0.72rem", padding: "20px 0", textAlign: "center" }}>
            No focus items yet — click &quot;+ ADD FOCUS&quot; above.
          </div>
        )}
      </AdminSection>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
