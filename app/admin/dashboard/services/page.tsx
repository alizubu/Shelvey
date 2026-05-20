"use client";

import { useEffect, useState } from "react";
import { toast }               from "sonner";
import { AdminSection, AddButton, SaveButton, DeleteButton } from "@/components/admin/AdminSection";
import { AdminField, AdminInput, AdminTextarea }              from "@/components/admin/AdminField";

interface Service { _id?: string; icon: string; title: string; desc: string; order: number; }
const BLANK: Omit<Service, "_id"> = { icon: "◈", title: "", desc: "", order: 0 };

export default function ServicesAdminPage() {
  const [items,  setItems]  = useState<Service[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = () =>
    fetch("/api/admin/services")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setItems(d); })
      .catch(() => {/* keep empty */})
      .finally(() => setLoaded(true));

  useEffect(() => { load(); }, []);

  const update = (id: string, k: keyof Service, v: unknown) =>
    setItems(prev => prev.map(s => (s._id === id ? { ...s, [k]: v } : s)));

  const saveItem = async (item: Service) => {
    setSaving(item._id ?? "new");
    try {
      const method = item._id ? "PUT"  : "POST";
      const url    = item._id ? `/api/admin/services/${item._id}` : "/api/admin/services";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      if (res.ok) { toast.success("Saved ✓"); load(); } else toast.error("Save failed — check MongoDB connection");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(null);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this service card?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Deleted"); load(); } else toast.error("Delete failed");
    } catch {
      toast.error("Network error");
    }
  };

  const addNew = () => setItems(prev => [{ ...BLANK, order: prev.length }, ...prev]);

  if (!loaded) return (
    <div style={{ color: "#555", fontFamily: "'IBM Plex Mono', monospace", padding: "40px", letterSpacing: "0.1em" }}>
      LOADING ...
    </div>
  );

  return (
    <div style={{ maxWidth: "820px" }}>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.62rem", color: "#39FF14", letterSpacing: "0.3em", marginBottom: "4px" }}>{"// 04"}</div>
          <h1 style={{ fontSize: "1.3rem", color: "#E8E8E8", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
            SERVICES<span style={{ color: "#39FF14" }}>.edit</span>
          </h1>
        </div>
        <AddButton onClick={addNew} label="ADD SERVICE" />
      </div>

      {items.length === 0 && (
        <div style={{ color: "#444", fontSize: "0.72rem", padding: "40px 0", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>
          No services — click &quot;+ ADD SERVICE&quot; to add one.
        </div>
      )}

      {items.map((item, idx) => (
        <AdminSection
          key={item._id ?? `new-${idx}`}
          title={item.title || "NEW SERVICE"}
          icon={item.icon || "◈"}
          actions={
            <div style={{ display: "flex", gap: "8px" }}>
              {item._id && <DeleteButton onClick={() => deleteItem(item._id!)} />}
              <SaveButton saving={saving === (item._id ?? "new")} onClick={() => saveItem(item)} label="SAVE" />
            </div>
          }
        >
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 80px", gap: "12px", marginBottom: "14px" }}>
            <AdminField label="ICON">
              <AdminInput value={item.icon}
                onChange={e => update(item._id ?? "", "icon", e.target.value)}
                placeholder="◈" />
            </AdminField>
            <AdminField label="TITLE">
              <AdminInput value={item.title}
                onChange={e => update(item._id ?? "", "title", e.target.value)}
                placeholder="DIGITAL STRATEGY" />
            </AdminField>
            <AdminField label="ORDER">
              <AdminInput type="number" value={item.order}
                onChange={e => update(item._id ?? "", "order", Number(e.target.value))} />
            </AdminField>
          </div>
          <AdminField label="DESCRIPTION">
            <AdminTextarea value={item.desc}
              onChange={e => update(item._id ?? "", "desc", e.target.value)}
              rows={3} />
          </AdminField>
        </AdminSection>
      ))}
    </div>
  );
}
