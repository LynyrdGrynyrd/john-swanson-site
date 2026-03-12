/**
 * Validates if a URL uses a safe protocol (http, https, or mailto).
 * This prevents XSS attacks via javascript: or data: URLs.
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is safe, false otherwise
 */
export const isSafeUrl = (url) => {
  if (!url) return false;
  const normalizedUrl = url.trim().toLowerCase();
  return (
    normalizedUrl.startsWith("http://") ||
    normalizedUrl.startsWith("https://") ||
    normalizedUrl.startsWith("mailto:") ||
    normalizedUrl.startsWith("/") ||
    normalizedUrl.startsWith("#")
  );
};
