"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, SaveButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput }   from "@/components/admin/AdminField";

interface Social {
  facebook: string; instagram: string; github: string;
  linkedin: string; twitter: string;
}
const DEFAULTS: Social = {
  facebook:  "https://facebook.com/shelveyelmodias",
  instagram: "https://instagram.com/shelveyelmodias",
  github:    "https://github.com/shelveyelmodias",
  linkedin:  "",
  twitter:   "",
};

const LINKS = [
  { key: "facebook",  label: "FACEBOOK",  placeholder: "https://facebook.com/..." },
  { key: "instagram", label: "INSTAGRAM", placeholder: "https://instagram.com/..." },
  { key: "github",    label: "GITHUB",    placeholder: "https://github.com/..." },
  { key: "linkedin",  label: "LINKEDIN",  placeholder: "https://linkedin.com/in/..." },
  { key: "twitter",   label: "TWITTER/X", placeholder: "https://twitter.com/..." },
] as const;

export default function SocialAdminPage() {
  const [data,   setData]   = useState<Social>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/social")
      .then(r => r.json())
      .then(d => { if (d) setData({ ...DEFAULTS, ...d }); })
      .catch(() => {/* use defaults */})
      .finally(() => setLoaded(true));
  }, []);

  const set = (k: keyof Social) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData(p => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Social links saved ✓"); else toast.error("Save failed — check MongoDB connection");
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
    <div style={{ maxWidth: "600px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 05"}</div>
        <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
          SOCIAL<span style={{ color: "#39FF14" }}>.edit</span>
        </h1>
      </div>

      <AdminSection title="SOCIAL LINKS" icon="⬟">
        {LINKS.map(({ key, label, placeholder }) => (
          <AdminField key={key} label={label}>
            <AdminInput
              type="url"
              value={data[key]}
              onChange={set(key)}
              placeholder={placeholder}
            />
          </AdminField>
        ))}
      </AdminSection>

      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
