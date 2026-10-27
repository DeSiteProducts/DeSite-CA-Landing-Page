"use client";

import { useEffect, useSyncExternalStore } from "react";
import { attributionFields, getVisitAttribution } from "./traffic-attribution";

// Attribution is immutable for this visit. React reads it again on hydration
// and keeps the hidden inputs controlled across wizard re-renders.
const subscribe = () => () => {};
const getServerSnapshot = () => null;

export function TrafficAttributionTracker() {
  useEffect(() => { getVisitAttribution(); }, []);
  return null;
}

export function TrafficAttributionFields() {
  const attribution = useSyncExternalStore(subscribe, getVisitAttribution, getServerSnapshot);
  return (
    <div hidden>
      {attributionFields.map((field) => (
        <input key={field} type="hidden" name={field} value={attribution?.[field] ?? ""} readOnly />
      ))}
    </div>
  );
}
