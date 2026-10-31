"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { galvanizedModels } from "../galvanized-models";
import GalvanizedGallery from "./GalvanizedGallery";
import ShippingQuoteButton from "./ShippingQuoteButton";
import ImageSlider from "./ImageSlider";

const equipmentBySize: Record<string, { title: string; images: string[] }> = {
  "108": {
    title: "DESIGNED FOR FULL SIZED EQUIPMENT",
    images: ["/108/icons/1.webp", "/108/icons/2.webp", "/108/icons/3.webp", "/108/icons/4.webp", "/108/icons/5.webp"],
  },
  "78": {
    title: "DESIGNED FOR MID SIZE EQUIPMENT",
    images: ["/78/icons/78Pro1.webp", "/78/icons/78Pro2.webp", "/78/icons/78Pro3.webp", "/78/icons/78Pro4.webp"],
  },
  "68": {
    title: "DESIGNED FOR COMPACT EQUIPMENT",
    images: ["/78/icons/78Pro1.webp", "/78/icons/78Pro2.webp", "/78/icons/78Pro4.webp"],
  },
};

const MachineModelModal = dynamic(() => import("./modalProductPage"), { ssr: false });
const buttonClass = "mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#0f0] px-6 py-2.5 text-md font-semibold uppercase tracking-wide text-[black] transition hover:bg-[#C9D1DC] hover:text-black";

export default function GalvanizedCards() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  return <>{galvanizedModels.map((model) => (
    <article key={model.slug} className="sale-card rounded-3xl border border-[#2674F0] bg-gradient-to-b from-[#2674F0] to-[#082F72] p-6 text-white shadow-xl shadow-[#03122B]/40">
      <div className="sale-ribbon"><span>ON SALE</span></div>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <GalvanizedGallery model={model} onOpenGallery={() => setSelectedModel(model.name)} />
        <div className="flex flex-col items-center text-center">
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">{model.name}</h2>
          <p className="mt-2 text-lg font-semibold uppercase tracking-[0.14em] text-[#E0E3E8]">New 2027 Forever Series</p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl"><span className="sr-only">Sale price: </span>${model.price.toLocaleString("en-CA")} CAD</p>
          <p className="mt-2 text-2xl font-semibold text-white/75 md:text-3xl"><span className="sr-only">Original price: </span><del>${(model.price + 1000).toLocaleString("en-CA")} CAD</del></p>
          <p className="limited-stock mt-3 text-xl font-extrabold md:text-2xl">Limited stock available</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            <button type="button" onClick={() => document.getElementById("mesh-sizes")?.scrollIntoView({ behavior: "smooth" })} className={buttonClass}>MESH SIZES</button>
            <button type="button" onClick={() => setSelectedModel(model.name)} className={buttonClass}>PHOTO GALLERY</button>
            <Link href={`/models/${model.slug}`} className={buttonClass}>MORE INFORMATION</Link>
            <ShippingQuoteButton model={model.name} />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="mt-4 text-center text-xl font-bold uppercase tracking-[0.14em] text-[#E0E3E8]">
          {equipmentBySize[model.size].title}
        </p>
        <ImageSlider images={equipmentBySize[model.size].images} alt={`${model.name} compatible equipment`} />
      </div>
    </article>
  ))}
    {selectedModel && <MachineModelModal key={selectedModel} model={selectedModel} isOpen onClose={() => setSelectedModel(null)} />}
  </>;
}
