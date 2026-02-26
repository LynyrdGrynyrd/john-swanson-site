export const NAV_LINKS = ["About", "Philosophy", "Experience", "Impact", "Digital R&D", "Publications", "Contact"];

export const toSlug = (value) => value.toLowerCase().replace(/\s+/g, "-").replace("&", "and");

export const NAV_SLUGS = NAV_LINKS.map(toSlug);
