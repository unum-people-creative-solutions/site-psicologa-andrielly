import { MetadataRoute } from "next";

// Data estável, atualizada manualmente quando o conteúdo das páginas muda de
// fato — new Date() a cada build gera ruído no crawler sem sinalizar nada.
const LAST_MODIFIED = new Date("2026-08-25");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://psiandriellyoliveira.com.br",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://psiandriellyoliveira.com.br/avaliacao-neuropsicologica",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://psiandriellyoliveira.com.br/politica-de-privacidade",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
