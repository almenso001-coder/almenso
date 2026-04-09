import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [] },
    }),
  ],

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },

  build: {
    target: "es2020",
    minify: "terser",
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 0,
    emptyOutDir: true,

    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

        // Prevent empty chunks
        manualChunks(id) {
          // React core — always cached
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }
          if (id.includes("react-router-dom")) {
            return "vendor-router";
          }
          // Heavy pages — separate chunks
          if (id.includes("pages/AdminPage")) return "page-admin";
          if (id.includes("pages/BlogPage")) return "page-blog";
          // Tools — by category
          if (id.includes("tools/calculators")) return "tools-calc";
          if (id.includes("tools/converters")) return "tools-conv";
          if (id.includes("tools/image-tools")) return "tools-img";
          if (id.includes("tools/text-tools")) return "tools-text";
          if (id.includes("tools/generators")) return "tools-gen";
          // Service pages together
          if (
            id.includes("ElectricianPage") ||
            id.includes("SolarPage") ||
            id.includes("InteriorPage")
          ) {
            return "pages-services";
          }
          // All other pages in main chunk
          if (id.includes("/pages/")) {
            return "pages-common";
          }
          // Components in shared chunk
          if (id.includes("/components/")) {
            return "components";
          }
        },
      },
      // Safe tree-shaking settings
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: true,
        tryCatchDeoptimization: false,
      },
    },

    // Safer esbuild options
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },

  server: {
    port: 5173,
    open: false,
    hmr: { overlay: true },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || "1.0.0"),
  },
});
