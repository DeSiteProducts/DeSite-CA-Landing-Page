"use client";

import Image from "next/image";
import GalvanizedGallery from "../_components/GalvanizedGallery";
import { galvanizedModels } from "../galvanized-models";
import Link from "next/link";
import { useEffect, useState } from "react";



const features = [
  {
    title: "CANTILEVERED SPRING SUSPENSION SYSTEM",
    description:
      "Just like our other models, such as the 108 and 78, the 68 ProScreen Galvanized is equipped with the Cantilevered Spring Suspension System. This advanced system allows the smaller screener to handle materials with moisture without any issues. The action and reaction of this system are essential for achieving the desired results in your screening process, ensuring smooth operation and consistent performance even with challenging materials.",
  },
  {
    title: "POWER BOX",
    description:
      "The Powerbox in the 68 ProScreen Galvanized operates with the same reliability and functionality as in our other models. It provides the necessary power to keep the screener running efficiently, ensuring consistent performance throughout your screening operations. Just like in the 108 and 78 models, the Powerbox is designed to be durable and dependable, handling the demands of your screening tasks with ease.",
  },
  {
    title: "TILTING SCREEN DECK",
    description:
      "The Tilting Screen Deck, combined with the Cantilevered Spring Suspension System, allows for direct contact between the bucket of your equipment and the screen deck. This feature gives you precise control over the screening process, making it easier to manage materials that are challenging or have a high moisture content. This technology is available across all our models because we understand how crucial it is to maintain efficiency and effectiveness when dealing with complex material.",
  },
];

const equipmentIcons68 = [
  { src: "/68/icons/Miniexcavators68.webp", label: "MINI EXCAVATOR" },
  { src: "/68/icons/MiniSkidsteers68.webp", label: "MINI SKID STEER" },
  { src: "/68/icons/SubCompacttractors68.webp", label: "SUB-COMPACT TRACTOR" },
];

const machineSpecs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "89 inches" },
      { label: "Machine Height", value: "74 inches" },
      { label: "Machine Depth", value: "48 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "68 inches" },
      { label: "Screen Deck Length", value: "52 inches" },
      { label: "Screen Deck Surface area", value: "27 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "VIBRATORY SYSTEM",
    rows: [
      { label: "Vibratory Style System", value: "Dual Eccentric Armature" },
      { label: "Eccentric Rotation Speed", value: "3600 rpm" },
      {
        label: "Amperage Draw",
        value:
          "10 each on start up with 5 Amps Amp draw per motor at 3600rpm",
      },
      { label: "Eccentric Force rotation", value: "760 lbs per/revolution" },
    ],
  },
  {
    title: "ELECTRICAL POWER SUPPLY",
    rows: [
      { label: "North America", value: "110 Volt ( 60 Hertz )" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [{ label: "Total Weight", value: "1500 lbs" }],
  },
];

export default function Model68Page() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeEquipment, setActiveEquipment] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEquipment((current) => (current + 2) % equipmentIcons68.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] px-6 py-12 text-white md:px-12">
      <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-10">
        <button
          type="button"
          onClick={() => {
            window.location.href = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
          }}
          className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
        >
          ← Back
        </button>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
          68 ProScreen Galvanized
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#E0E3E8] md:text-base">
          Design For Buckets Up To 66 inches
        </p>

        <GalvanizedGallery model={galvanizedModels[2]} />
        <Link
           href={`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/?model=${encodeURIComponent(
            "68 ProScreen Galvanized"
          )}#shipping-quote`}
          className="mx-auto mt-5 block w-fit rounded-full bg-[#2674F0] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5693F3]"
        >
          CLICK HERE FOR A SHIPPING QUOTE
        </Link>

        <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            DESIGNED FOR COMPACT EQUIPMENT
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[0, 1].map((offset) => {
              const item =
                equipmentIcons68[(activeEquipment + offset) % equipmentIcons68.length];
              return (
                <div
                  key={`${item.label}-${offset}`}
                  className="overflow-hidden rounded-xl border border-white/20 bg-transparent text-center py-3"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={320}
                    height={320}
                    className="mx-auto h-24 w-24 object-contain md:h-28 md:w-28"
                  />
                  <p className="px-2 py-2 text-[11px] font-bold tracking-wide text-white md:text-xs">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            YOU CAN SCREEN
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Sand",
              "Topsoil",
              "Compost",
              "Wood Mulch",
              "Pea Stone",
              "Septic Rock",
              "Road Gravel",
              "Landscape Stone",
              "Ground Asphalt",
              "Crushed Concrete",
              "Erosion Control Rock",
              "Traction Sand",
            ].map((material) => (
              <div
                key={material}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {material}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            FEATURES
          </h2>
          <p className="mt-2 text-center text-sm font-semibold tracking-wide text-[#E0E3E8]">
            {features[activeFeature].title}
          </p>
          {features[activeFeature].description && (
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-[#E0E3E8]">
              {features[activeFeature].description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                setActiveFeature(
                  (current) =>
                    (current - 1 + features.length) % features.length
                )
              }
              className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
            >
              Previous
            </button>
            <p className="text-center text-sm font-semibold text-[#E0E3E8]">
              {activeFeature + 1} / {features.length}
            </p>
            <button
              type="button"
              onClick={() =>
                setActiveFeature((current) => (current + 1) % features.length)
              }
              className="rounded-full bg-[#2674F0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5693F3]"
            >
              Next
            </button>
          </div>

        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            MACHINE SPECIFICATIONS
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {machineSpecs.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-4"
              >
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#AFC2DC]">
                  {section.title}
                </h3>
                <div className="mt-3 space-y-2">
                  {section.rows.map((row) => (
                    <div
                      key={`${section.title}-${row.label}`}
                      className="rounded-lg border border-white/15 bg-[#03122B]/40 px-3 py-2"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#AFC2DC]">
                        {row.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2674F0]/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 3l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-extrabold uppercase tracking-wide text-white">
                5 Year Structural Warranty
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2674F0]/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-extrabold uppercase tracking-wide text-white">
                1 Year Electrical Warranty
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-wide md:text-3xl">
            MESH AVAILABLE
          </h2>

          <div className="mt-6 rounded-2xl border border-[#2674F0] overflow-hidden">
            <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
              SQUARE
            </h3>
            <table className="w-full text-center text-base text-white">
              <thead className="bg-[#1B4FA8] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-center">Mesh Size</th>
                  <th className="px-4 py-3 font-bold text-center">Pattern</th>
                  <th className="px-4 py-3 font-bold text-center">Product Size</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['5/32" x 5/32"', "Square", '1/16"'],
                  ['1/4" x 1/4"', "Square", '1/8"'],
                  ['3/8" x 3/8"', "Square", '1/4"'],
                  ['1/2" x 1/2"', "Square", '3/8"'],
                  ['1" x 1"', "Square", '3/4"'],
                  ['2" x 2"', "Square", '1-1/2"'],
                  ['3" x 3"', "Square", '2"'],
                  ['4" x 4"', "Square", '3"'],
                ].map((row, index) => (
                  <tr
                    key={`square-${row[0]}`}
                    className={index % 2 === 0 ? "bg-[#102B59]" : "bg-[#0B234A]"}
                  >
                    <td className="px-4 py-3 text-center">{row[0]}</td>
                    <td className="px-4 py-3 text-center">{row[1]}</td>
                    <td className="px-4 py-3 text-center">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-[#2674F0] overflow-hidden">
            <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
              ELONGATED
            </h3>
            <table className="w-full text-center text-base text-white">
              <thead className="bg-[#1B4FA8] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-center">Mesh Size</th>
                  <th className="px-4 py-3 font-bold text-center">Pattern</th>
                  <th className="px-4 py-3 font-bold text-center">Product Size</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['3/8" x 4"', "Elongated", '1/4" to 5/16"'],
                  ['1/2" x 4"', "Elongated", '3/8" to 7/16"'],
                  ['3/4" x 4"', "Elongated", '1/2" to 9/16"'],
                  ['1" x 4"', "Elongated", '3/4" to 7/8"'],
                ].map((row, index) => (
                  <tr
                    key={`elongated-${row[0]}`}
                    className={index % 2 === 0 ? "bg-[#102B59]" : "bg-[#0B234A]"}
                  >
                    <td className="px-4 py-3 text-center">{row[0]}</td>
                    <td className="px-4 py-3 text-center">{row[1]}</td>
                    <td className="px-4 py-3 text-center">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
