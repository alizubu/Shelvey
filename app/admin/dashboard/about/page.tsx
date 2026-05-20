"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, SaveButton, AddButton, DeleteButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea }              from "@/components/admin/AdminField";

interface Discipline { _id?: string; icon: string; title: string; desc: string; }
interface About {
  bio: string; location: string; email: string;
  yearsExp: number; companies: number;
  disciplines: Discipline[];
}

const DEFAULTS: About = {
  bio: "I'm a Digital Marketing Specialist with a proven track record of leveraging analytics to drive measurable brand growth.",
  location: "Chittagong, Bangladesh",
  email: "shelveyelmodias@gmail.com",
  yearsExp: 7,
  companies: 3,
  disciplines: [],
};

export default function AboutAdminPage() {
  const [data,   setData]   = useState<About>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...DEFAULTS, ...d }); })
      .catch(() => {/* use defaults */})
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
      if (res.ok) toast.success("About saved ✓"); else toast.error("Save failed — check MongoDB connection");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const setField = (k: keyof Omit<About, "disciplines">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({
        ...prev,
        [k]: (k === "yearsExp" || k === "companies") ? Number(e.target.value) : e.target.value,
      }));

  const setDisc = (i: number, k: keyof Discipline, v: string) =>
    setData(prev => ({
      ...prev,
      disciplines: prev.disciplines.map((d, idx) => idx === i ? { ...d, [k]: v } : d),
    }));

  const addDisc = () =>
    setData(prev => ({ ...prev, disciplines: [...prev.disciplines, { icon: "◈", title: "", desc: "" }] }));

  const delDisc = (i: number) =>
    setData(prev => ({ ...prev, disciplines: prev.disciplines.filter((_, idx) => idx !== i) }));

  if (!loaded) return (
    <div style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace", padding: "40px", letterSpacing: "0.1em" }}>
      LOADING ...
    </div>
  );

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 02"}</div>
        <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          ABOUT<span style={{ color: "#39FF14" }}>.edit</span>
        </h1>
      </div>

      <AdminSection title="BIO" icon="◉">
        <AdminField label="BIO TEXT" hint="displayed in terminal window">
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

      <AdminSection
        title="CORE DISCIPLINES"
        icon="⬡"
        actions={<AddButton onClick={addDisc} label="ADD DISCIPLINE" />}
      >
        {data.disciplines.map((d, i) => (
          <div key={i} style={{ padding: "16px", border: "1px solid #1A1A1A", marginBottom: "12px", position: "relative" }}>
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
          <div style={{ color: "#444", fontSize: "0.72rem", padding: "20px 0", textAlign: "center" }}>
            No disciplines yet — click &quot;+ ADD DISCIPLINE&quot; above.
          </div>
        )}
      </AdminSection>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
