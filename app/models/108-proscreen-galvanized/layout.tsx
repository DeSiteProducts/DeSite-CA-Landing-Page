import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "108 ProScreen Galvanized",
  description: "Explore the 108 ProScreen Galvanized, New 2027 Forever Series, equipment compatibility, mesh options, and machine specifications.",
  openGraphDescription: "108 ProScreen Galvanized: New 2027 Forever Series. View photos and machine specifications.",
  path: "/models/108-proscreen-galvanized",
});

export default function Layout({ children }: { children: ReactNode }) { return children; }
