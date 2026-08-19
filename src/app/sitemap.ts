import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Requerido por `output: 'export'`: sin esto, Next intenta tratar la ruta
// como dinámica y el build de export estático falla.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
