export function isSafeUrl(url) {
  if (typeof url !== "string") return false;

  // Allow relative paths or anchors
  if (url.startsWith("/") || url.startsWith("#")) {
    return true;
  }

  try {
    const parsed = new URL(url);
    const safeProtocols = ["http:", "https:", "mailto:"];
    return safeProtocols.includes(parsed.protocol);
  } catch {
    // If it's not a valid URL according to the URL constructor and it didn't
    // start with / or #, reject it.
    return false;
  }
}
