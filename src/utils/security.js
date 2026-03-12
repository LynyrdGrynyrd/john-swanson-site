export function isSafeUrl(url) {
  if (typeof url !== "string" || !url) return false;

  const trimmedUrl = url.trim();
  if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#")) return true;

  try {
    const parsed = new URL(trimmedUrl);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
