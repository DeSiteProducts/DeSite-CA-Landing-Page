"use client";

import { useEffect, useRef } from "react";
import { attributionFields, getVisitAttribution } from "./traffic-attribution";

export function TrafficAttributionTracker() {
  useEffect(() => { getVisitAttribution(); }, []);
  return null;
}

export function TrafficAttributionFields() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const attribution = getVisitAttribution();
    for (const field of attributionFields) {
      const input = container.current?.querySelector<HTMLInputElement>(`input[name="${field}"]`);
      if (input) input.value = attribution[field];
    }
  }, []);
  return (
    <div ref={container} hidden>
      {attributionFields.map((field) => <input key={field} type="hidden" name={field} defaultValue="" />)}
    </div>
  );
}
