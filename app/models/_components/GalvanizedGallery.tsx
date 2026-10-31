"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { galvanizedModels } from "../galvanized-models";

const MachineModelModal = dynamic(() => import("./modalProductPage"), { ssr: false });

export default function GalvanizedGallery({ model, onOpenGallery }: {
  model: (typeof galvanizedModels)[number];
  onOpenGallery?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const openGallery = onOpenGallery ?? (() => setOpen(true));
  return (
    <div className="w-full text-center">
      {model.images.length ? (
        <button type="button" onClick={openGallery} className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-transparent" aria-label={`Open ${model.name} photo gallery`}>
          <Image src={model.images[0]} alt={model.name} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-contain" />
        </button>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/25 bg-[#03122B]/40 p-6 text-xl font-semibold text-white/80">Photos coming soon</div>
      )}
      <MachineModelModal model={model.name} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
