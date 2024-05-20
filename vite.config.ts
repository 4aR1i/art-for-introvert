import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/art-for-introvert" : "/";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
    build: {
      assetsDir: "assets",
      sourcemap: false,
      chunkSizeWarningLimit: 1024,
      emptyOutDir: true,
      rollupOptions: {
        cache: false,
        output: {
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (name?.endsWith(".css")) {
              return "css/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
