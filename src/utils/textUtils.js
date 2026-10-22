const LINK_PATTERN = /\{(\w+)\}/;

/**
 * Parses a description string with placeholders and returns an array of parts.
 * Each part is either a plain string or an object representing a validated link.
 *
 * @param {string} desc - The description text containing {key} placeholders
 * @param {Object} descLinks - Map of keys to {text, url} objects
 * @param {Function} isSafeUrl - Function to validate if a URL is safe
 * @returns {Array} - Array of strings and objects {type: 'link', url, text}
 */
export function parseDesc(desc, descLinks, isSafeUrl) {
  if (!descLinks || !desc) return [desc || ""];

  const parts = desc.split(LINK_PATTERN);

  return parts.map((part) => {
    const link = descLinks[part];
    if (link) {
      if (isSafeUrl && isSafeUrl(link.url)) {
        return { type: 'link', url: link.url, text: link.text };
      }
      // If link exists but is unsafe or no validator provided, treat as plain text
      return link.text;
    }
    return part;
  });
}
