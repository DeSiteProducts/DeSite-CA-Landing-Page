import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../app/traffic-attribution.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
const { detectAttribution, normalizeAttribution, getVisitAttribution } = await import(moduleUrl);
const base = "https://desiteproducts.com/";
const cases = [
  ["?utm_source=facebook", "", "facebook"],
  ["?utm_source=ig", "https://l.facebook.com/", "instagram"],
  ["?utm_source=google&utm_medium=cpc", "", "google_ads"],
  ["?gclid=example", "", "google_ads"],
  ["?wbraid=example", "", "google_ads"],
  ["?gbraid=example", "", "google_ads"],
  ["", "https://www.google.ca/search", "google"],
  ["", "https://www.google.co.uk/", "google"],
  ["", "https://l.instagram.com/", "instagram"],
  ["", "https://m.facebook.com/", "facebook"],
  ["?fbclid=example", "", "meta_unknown"],
  ["", "", "direct_unknown"],
  ["", base + "models/slg-78", "direct_unknown"],
  ["", "https://google.com.example.org/", "referral"],
  ["?utm_source=newsletter", "https://google.com/", "other_campaign"],
];
for (const [query, referrer, expected] of cases) {
  assert.equal(detectAttribution(base + query, referrer).trafficSource, expected);
}
assert.equal(normalizeAttribution({ utm_campaign: "a".repeat(1000) }).utm_campaign.length, 500);
assert.equal(normalizeAttribution(null).trafficSource, "");
const data = new Map();
globalThis.sessionStorage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) };
globalThis.window = { location: { href: base + "?utm_source=instagram&utm_campaign=fall" } };
globalThis.document = { referrer: "" };
assert.equal(getVisitAttribution().trafficSource, "instagram");
window.location.href = base + "shipping-quote";
assert.equal(getVisitAttribution().utm_campaign, "fall");
const reloaded = await import(moduleUrl + "#reload");
assert.equal(reloaded.getVisitAttribution().trafficSource, "instagram");
globalThis.sessionStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
const blocked = await import(moduleUrl + "#blocked");
assert.equal(blocked.getVisitAttribution().trafficSource, "direct_unknown");
console.log("Traffic attribution: classification, sanitization, navigation, reload and blocked storage passed.");
