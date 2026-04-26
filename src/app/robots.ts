import { Metadata } from "next";

export default function Robots(): Metadata {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://psiandriellyoliveira.com.br/sitemap.xml",
  };
}
