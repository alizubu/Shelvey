/** Basic XSS / injection sanitiser for string fields. */
export function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

export function sanitizeDeep<T>(obj: T): T {
  if (typeof obj === "string") return sanitize(obj) as unknown as T;
  if (Array.isArray(obj))      return obj.map(sanitizeDeep) as unknown as T;
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, sanitizeDeep(v)])
    ) as T;
  }
  return obj;
}
