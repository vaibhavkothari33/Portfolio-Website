export function getReadingTime(text: string): string {
  const safeText = typeof text === "string" ? text : String(text ?? "");
  const words = safeText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function slugifyHeading(text: string): string {
  const safeText = typeof text === "string" ? text : String(text ?? "");
  return safeText
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
