"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, AddButton, SaveButton, DeleteButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea }              from "@/components/admin/AdminField";

interface Job {
  _id?: string;
  role: string; company: string; period: string;
  focus: string[]; desc: string; current: boolean; order: number;
}

const BLANK: Omit<Job, "_id"> = { role: "", company: "", period: "", focus: [], desc: "", current: false, order: 0 };

export default function ExperienceAdminPage() {
  const [jobs,   setJobs]   = useState<Job[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = () =>
    fetch("/api/admin/experience")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setJobs(d); })
      .catch(() => {/* keep empty array */})
      .finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const update = (id: string, k: keyof Job, v: unknown) =>
    setJobs(prev => prev.map(j => (j._id === id ? { ...j, [k]: v } : j)));

  const setFocus = (id: string, v: string) =>
    update(id, "focus", v.split(",").map(s => s.trim()).filter(Boolean));

  const saveJob = async (job: Job) => {
    setSaving(job._id ?? "new");
    try {
      const method = job._id ? "PUT"  : "POST";
      const url    = job._id ? `/api/admin/experience/${job._id}` : "/api/admin/experience";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(job) });
      if (res.ok) { toast.success("Saved ✓"); load(); } else toast.error("Save failed — check MongoDB connection");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(null);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Deleted"); load(); } else toast.error("Delete failed");
    } catch {
      toast.error("Network error");
    }
  };

  const addNew = () => setJobs(prev => [{ ...BLANK, order: prev.length }, ...prev]);

  if (!loaded) return (
    <div style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace", padding: "40px", letterSpacing: "0.1em" }}>
      LOADING ...
    </div>
  );

  return (
    <div style={{ maxWidth: "820px" }}>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 03"}</div>
          <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
            EXPERIENCE<span style={{ color: "#39FF14" }}>.edit</span>
          </h1>
        </div>
        <AddButton onClick={addNew} label="ADD ENTRY" />
      </div>

      {jobs.length === 0 && (
        <div style={{ color: "#444", fontSize: "0.72rem", padding: "40px 0", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>
          No experience entries — click &quot;+ ADD ENTRY&quot; to add one.
          {!process.env.NEXT_PUBLIC_HAS_DB && (
            <div style={{ marginTop: "8px", color: "#333", fontSize: "0.66rem" }}>
              (Connect MongoDB to persist data)
            </div>
          )}
        </div>
      )}

      {jobs.map((job, idx) => (
        <AdminSection
          key={job._id ?? `new-${idx}`}
          title={job.company || "NEW ENTRY"}
          subtitle={job.role || "—"}
          icon="⬡"
          actions={
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {job._id && <DeleteButton onClick={() => deleteJob(job._id!)} />}
              <SaveButton saving={saving === (job._id ?? "new")} onClick={() => saveJob(job)} label="SAVE" />
            </div>
          }
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <AdminField label="COMPANY">
              <AdminInput value={job.company}
                onChange={e => update(job._id ?? "", "company", e.target.value)}
                placeholder="Company Name" />
            </AdminField>
            <AdminField label="ROLE / TITLE">
              <AdminInput value={job.role}
                onChange={e => update(job._id ?? "", "role", e.target.value)}
                placeholder="Senior Digital Marketing Officer" />
            </AdminField>
            <AdminField label="PERIOD">
              <AdminInput value={job.period}
                onChange={e => update(job._id ?? "", "period", e.target.value)}
                placeholder="2021 — Dec 2025" />
            </AdminField>
            <AdminField label="CURRENT ROLE">
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginTop: "10px" }}>
                <input type="checkbox" checked={job.current}
                  onChange={e => update(job._id ?? "", "current", e.target.checked)}
                  style={{ accentColor: "#39FF14", width: "16px", height: "16px" }} />
                <span style={{ color: "#888", fontSize: "0.78rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  Mark as current
                </span>
              </label>
            </AdminField>
          </div>
          <AdminField label="FOCUS TAGS" hint="comma separated">
            <AdminInput value={job.focus.join(", ")}
              onChange={e => setFocus(job._id ?? "", e.target.value)}
              placeholder="Full-Funnel Strategy, Performance Marketing" />
          </AdminField>
          <AdminField label="DESCRIPTION">
            <AdminTextarea value={job.desc}
              onChange={e => update(job._id ?? "", "desc", e.target.value)}
              rows={4} />
          </AdminField>
          <AdminField label="ORDER" hint="lower = higher up">
            <AdminInput type="number" value={job.order} style={{ width: "100px" }}
              onChange={e => update(job._id ?? "", "order", Number(e.target.value))} />
          </AdminField>
        </AdminSection>
      ))}
    </div>
  );
}
