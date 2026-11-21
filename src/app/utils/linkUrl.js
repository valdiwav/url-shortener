export const LINK_DRAFT_KEY = "lnkut:draft";

export function httpUrl(value) {
  if (typeof value !== "string" || value.length > 8192) return null;

  try {
    const url = new URL(value.trim());
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    if (url.hostname.includes("%") || /\s/.test(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export function destinationUrl(value) {
  const input = typeof value === "string" ? value.trim() : "";
  if (!input) return null;
  const explicitScheme = /^[a-z][a-z\d+.-]*:/i.test(input);
  const hostWithPort = /^(?:localhost|[^/:\s]+\.[^/:\s]+):\d+(?:[/?#]|$)/i.test(input);
  if (explicitScheme && !hostWithPort) return httpUrl(input);

  const url = httpUrl(input.startsWith("//") ? "https:" + input : "https://" + input);
  if (!url) return null;
  const host = url.hostname;
  return host.includes(".") || host.startsWith("[") || host === "localhost" ? url : null;
}

export function displayLink(value) {
  return value.replace(/^https?:\/\//, "");
}
