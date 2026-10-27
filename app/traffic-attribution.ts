export const attributionFields = [
  "trafficSource", "utm_source", "utm_medium", "utm_campaign", "utm_content",
  "utm_term", "gclid", "gbraid", "wbraid", "fbclid", "landingPage", "referrer",
] as const;

export type Attribution = Record<(typeof attributionFields)[number], string>;

export function normalizeAttribution(value: unknown): Attribution {
  const data = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return Object.fromEntries(attributionFields.map((key) => [
    key, typeof data[key] === "string" ? data[key].slice(0, 500) : "",
  ])) as Attribution;
}

export function detectAttribution(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const result = normalizeAttribution(Object.fromEntries(url.searchParams));
  result.landingPage = url.pathname.slice(0, 500);
  let host = "";
  try {
    const previous = new URL(referrer);
    if (previous.origin !== url.origin) host = previous.hostname.toLowerCase();
  } catch { /* Direct visits may not have a referrer. */ }
  result.referrer = host.slice(0, 500);
  const source = result.utm_source.trim().toLowerCase();
  const medium = result.utm_medium.trim().toLowerCase();
  const domain = (name: string) => host === name || host.endsWith(`.${name}`);

  if (result.gclid || result.gbraid || result.wbraid ||
      ["google_ads", "google-ads", "googleads"].includes(source) ||
      (source === "google" && ["cpc", "ppc", "paid", "paid_search", "paidsearch", "display"].includes(medium))) {
    result.trafficSource = "google_ads";
  } else if (["instagram", "ig"].includes(source)) {
    result.trafficSource = "instagram";
  } else if (["facebook", "fb"].includes(source)) {
    result.trafficSource = "facebook";
  } else if (source === "google") {
    result.trafficSource = "google";
  } else if (source) {
    result.trafficSource = "other_campaign";
  } else if (domain("instagram.com")) {
    result.trafficSource = "instagram";
  } else if (domain("facebook.com") || domain("fb.com")) {
    result.trafficSource = "facebook";
  } else if (/(^|\.)google\.(com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host)) {
    result.trafficSource = "google";
  } else if (result.fbclid) {
    result.trafficSource = "meta_unknown";
  } else {
    result.trafficSource = host ? "referral" : "direct_unknown";
  }
  return result;
}

const storageKey = "desite:traffic-attribution:v1";
let current: Attribution | undefined;

// First entry in this tab's session; internal navigation never overwrites it.
export function getVisitAttribution(): Attribution {
  if (current) return current;
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const parsed = normalizeAttribution(JSON.parse(stored));
      if (parsed.trafficSource) current = parsed;
    }
  } catch { /* Continue when browser storage is blocked or invalid. */ }
  if (!current) {
    current = detectAttribution(window.location.href, document.referrer);
    try { sessionStorage.setItem(storageKey, JSON.stringify(current)); } catch { /* Memory fallback. */ }
  }
  return current;
}
