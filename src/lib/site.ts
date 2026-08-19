// Fuente única de la URL base del sitio (§10). Viene de NEXT_PUBLIC_SITE_URL
// para que, cuando exista dominio propio (CLAUDE.md §14), sea un solo valor
// a cambiar en vez de una búsqueda por el repo.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://camilo-portafolio-rho.vercel.app";
