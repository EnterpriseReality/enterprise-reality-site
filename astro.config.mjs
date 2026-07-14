import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.enterprisereality.org",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
