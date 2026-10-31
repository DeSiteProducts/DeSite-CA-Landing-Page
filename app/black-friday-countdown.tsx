"use client";

import { useEffect, useState } from "react";

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

export default function BlackFridayCountdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);

  useEffect(() => {
    const update = () => {
      // Local midnight after November 30, 2026, in the visitor's time zone.
      // Keep the campaign year fixed so an expired sale never restarts.
      const deadline = new Date(2026, 11, 1).getTime();
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining([
        Math.floor(seconds / 86400),
        Math.floor((seconds % 86400) / 3600),
        Math.floor((seconds % 3600) / 60),
        seconds % 60,
      ]);
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="black-friday-banner" aria-label="Early Black Friday Sale ends November 30, 2026, at midnight in your local time">
      <div className="black-friday-countdown" role="timer" aria-live="off">
        <span className="black-friday-dot" aria-hidden="true" />
        {units.map((unit, index) => (
          <div className="black-friday-unit" key={unit}>
            <span className="black-friday-number">
              {remaining ? String(remaining[index]).padStart(2, "0") : "--"}
            </span>
            <span className="black-friday-label">{unit}</span>
          </div>
        ))}
      </div>
      <p className="black-friday-title">Early Black Friday Sale</p>
    </section>
  );
}
