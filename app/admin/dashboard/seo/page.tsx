"use client";

import { useEffect, useState, useRef } from "react";
import { toast }                        from "sonner";
import { AdminSection, SaveButton }     from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/AdminField";

interface Seo {
  metaTitle: string; metaDescription: string;
  ogTitle: string;   ogDescription: string;
  ogImage: string;   keywords: string;
}
const DEFAULTS: Seo = {
  metaTitle:       "Shelvey Elmo Dias — Digital Marketing Specialist",
  metaDescription: "Portfolio of Shelvey Elmo Dias — SEO & SEM Expert, Analytics & CRO Strategist.",
  ogTitle:         "Shelvey Elmo Dias — Digital Marketing Specialist",
  ogDescription:   "Driving measurable growth through data-driven strategy, performance marketing, and conversion optimization.",
  ogImage:         "",
  keywords:        "digital marketing, SEO, SEM, CRO, performance marketing, analytics, Bangladesh",
};

export default function SeoAdminPage() {
  const [data,      setData]      = useState<Seo>(DEFAULTS);
  const [saving,    setSaving]    = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...DEFAULTS, ...d }); })
      .catch(() => {/* use defaults */})
      .finally(() => setLoaded(true));
  }, []);

  const set = (k: keyof Seo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(p => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("SEO settings saved ✓"); else toast.error("Save failed — check MongoDB connection");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const uploadOg = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setData(p => ({ ...p, ogImage: url }));
        toast.success("OG image uploaded ✓");
      } else {
        toast.error("Upload failed — check Cloudinary credentials");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUploading(false);
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
        <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 06"}</div>
        <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          SEO<span style={{ color: "#39FF14" }}>.edit</span>
        </h1>
      </div>

      <AdminSection title="META TAGS" icon="△">
        <AdminField label="META TITLE" hint="browser tab + search result title">
          <AdminInput value={data.metaTitle} onChange={set("metaTitle")} />
        </AdminField>
        <AdminField label="META DESCRIPTION" hint="max 160 chars">
          <AdminTextarea value={data.metaDescription} onChange={set("metaDescription")} rows={3} />
        </AdminField>
        <AdminField label="KEYWORDS" hint="comma separated">
          <AdminInput value={data.keywords} onChange={set("keywords")} placeholder="digital marketing, SEO, ..." />
        </AdminField>
      </AdminSection>

      <AdminSection title="OPEN GRAPH" icon="◈">
        <AdminField label="OG TITLE">
          <AdminInput value={data.ogTitle} onChange={set("ogTitle")} />
        </AdminField>
        <AdminField label="OG DESCRIPTION">
          <AdminTextarea value={data.ogDescription} onChange={set("ogDescription")} rows={3} />
        </AdminField>
        <AdminField label="OG IMAGE URL" hint="or drag-and-drop below">
          <AdminInput value={data.ogImage} onChange={set("ogImage")} placeholder="https://..." />
        </AdminField>

        {/* Drag & drop upload zone */}
        <div
          style={{
            border: "1px dashed #2A2A2A", padding: "20px", textAlign: "center",
            cursor: "pointer", marginTop: "8px", transition: "border-color 0.2s",
          }}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#39FF14"; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = "#2A2A2A"; }}
          onDrop={e => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "#2A2A2A";
            const file = e.dataTransfer.files[0];
            if (file) uploadOg(file);
          }}
        >
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => { if (e.target.files?.[0]) uploadOg(e.target.files[0]); }} />
          {data.ogImage
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={data.ogImage} alt="OG preview"
                style={{ maxHeight: "120px", maxWidth: "100%", objectFit: "contain" }} />
            : <div style={{ color: "#555", fontSize: "0.72rem", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>
                {uploading ? "UPLOADING ..." : "DRAG & DROP  or  CLICK TO UPLOAD  (1200×630 recommended)"}
              </div>
          }
        </div>
      </AdminSection>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
