/**
 * Validates if a URL uses a safe protocol (http, https, or mailto).
 * This prevents XSS attacks via javascript: or data: URLs.
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is safe, false otherwise
 */
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
