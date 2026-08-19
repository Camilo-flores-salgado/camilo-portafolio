import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Requerido por `output: 'export'`: sin esto, Next intenta tratar la ruta
// como dinámica y el build de export estático falla.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
