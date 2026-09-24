import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Prisma 7 dynamically imports `.mjs` query-compiler bundles that are
      // shipped as `.js` — map them so Turbopack can resolve them.
      "@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs":
        "@prisma/client/runtime/query_compiler_fast_bg.postgresql.js",
      "@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs":
        "@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js",
    },
  },
};

export default nextConfig;