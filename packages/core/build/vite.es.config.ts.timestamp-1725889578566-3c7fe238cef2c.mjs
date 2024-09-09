// build/vite.es.config.ts
import { defineConfig } from "file:///D:/codes/toy-elements/node_modules/.pnpm/vite@5.4.2_@types+node@20.16.1_terser@5.31.6/node_modules/vite/dist/node/index.js";
import { readdir, readdirSync } from "fs";
import vue from "file:///D:/codes/toy-elements/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.2_@types+node@20.16.1_terser@5.31.6__vue@3.4.38_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/codes/toy-elements/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.16.1_rollup@4.21.0_typescript@5.5.4_vite@5.4.2_@types+node@20.16.1_terser@5.31.6_/node_modules/vite-plugin-dts/dist/index.mjs";
import terser from "file:///D:/codes/toy-elements/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.21.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { resolve } from "path";
import { includes, filter, map, delay, defer } from "file:///D:/codes/toy-elements/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell2 from "file:///D:/codes/toy-elements/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";

// build/hooksPlugin.ts
import { each, isFunction } from "file:///D:/codes/toy-elements/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///D:/codes/toy-elements/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";
function hooksPlugin({ rmFiles, beforeBuild, afterBuild }) {
  return {
    name: "hooks-plugin",
    buildStart: () => {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd: (err) => {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// build/vite.es.config.ts
var __vite_injected_original_dirname = "D:\\codes\\toy-elements\\packages\\core\\build";
var TRY_MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell2.mv("./dist/es/theme", "./dist"));
  });
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    // esbuild terser
    // terserOptions:{
    //     compress:{},
    //     format:{},
    //     mangle:{}
    // },
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          if (chunkInfo.type === "asset" && /\.(css)$/i.test(chunkInfo.name)) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name;
        },
        // 分包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiLCAiYnVpbGQvaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFx0b3ktZWxlbWVudHNcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcdG95LWVsZW1lbnRzXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGVzL3RveS1lbGVtZW50cy9wYWNrYWdlcy9jb3JlL2J1aWxkL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHJlYWRkaXIsIHJlYWRkaXJTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuaW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBpbmNsdWRlcywgZmlsdGVyLCBtYXAsIGRlbGF5LCBkZWZlciB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuLy8gXHU3NTI4XHU0RThFXHU3NTFGXHU2MjEwXHU3QzdCXHU1NzhCXHU2NTg3XHU0RUY2XHJcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJ1xyXG5pbXBvcnQgaG9va3MgZnJvbSAnLi9ob29rc1BsdWdpbic7XHJcblxyXG5cclxuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZID0gODAwIGFzIGNvbnN0O1xyXG5cclxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCI7XHJcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjtcclxuXHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbnRyaWVzID0gcmVhZGRpclN5bmMoYmFzZVBhdGgsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcclxuXHJcbiAgICByZXR1cm4gbWFwKFxyXG4gICAgICAgIGZpbHRlcihlbnRyaWVzLCAoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG4gICAgICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICAgKTtcclxufVxyXG5mdW5jdGlvbiBtb3ZlU3R5bGVzKCl7XHJcbiAgICByZWFkZGlyKFwiLi9kaXN0L2VzL3RoZW1lXCIsIChlcnIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZGVsYXkobW92ZVN0eWxlcywgVFJZX01PVkVfU1RZTEVTX0RFTEFZKTtcclxuICAgICAgICBkZWZlcigoKSA9PiBzaGVsbC5tdihcIi4vZGlzdC9lcy90aGVtZVwiLCBcIi4vZGlzdFwiKSk7XHJcbiAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIHRzY29uZmlnUGF0aDogJy4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxyXG4gICAgICAgICAgICBvdXREaXI6ICdkaXN0L3R5cGVzJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGhvb2tzKHtcclxuICAgICAgICAgICAgcm1GaWxlczpbJy4vZGlzdC9lcycsJy4vZGlzdC90aGVtZScsJy4vZGlzdC90eXBlcyddLFxyXG4gICAgICAgICAgICBhZnRlckJ1aWxkOm1vdmVTdHlsZXNcclxuICAgICAgICB9KSxcclxuICAgICAgICB0ZXJzZXIoe1xyXG4gICAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICAgIHNlcXVlbmNlczogaXNQcm9kLFxyXG4gICAgICAgICAgICAgIGFyZ3VtZW50czogaXNQcm9kLFxyXG4gICAgICAgICAgICAgIGRyb3BfY29uc29sZTogaXNQcm9kICYmIFtcImxvZ1wiXSxcclxuICAgICAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgcGFzc2VzOiBpc1Byb2QgPyA0IDogMSxcclxuICAgICAgICAgICAgICBnbG9iYWxfZGVmczoge1xyXG4gICAgICAgICAgICAgICAgXCJAREVWXCI6IEpTT04uc3RyaW5naWZ5KGlzRGV2KSxcclxuICAgICAgICAgICAgICAgIFwiQFBST0RcIjogSlNPTi5zdHJpbmdpZnkoaXNQcm9kKSxcclxuICAgICAgICAgICAgICAgIFwiQFRFU1RcIjogSlNPTi5zdHJpbmdpZnkoaXNUZXN0KSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAgICAgICBzZW1pY29sb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgICBzaG9ydGhhbmQ6IGlzUHJvZCxcclxuICAgICAgICAgICAgICBicmFjZXM6ICFpc1Byb2QsXHJcbiAgICAgICAgICAgICAgYmVhdXRpZnk6ICFpc1Byb2QsXHJcbiAgICAgICAgICAgICAgY29tbWVudHM6ICFpc1Byb2QsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hbmdsZToge1xyXG4gICAgICAgICAgICAgIHRvcGxldmVsOiBpc1Byb2QsXHJcbiAgICAgICAgICAgICAgZXZhbDogaXNQcm9kLFxyXG4gICAgICAgICAgICAgIGtlZXBfY2xhc3NuYW1lczogaXNEZXYsXHJcbiAgICAgICAgICAgICAga2VlcF9mbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICdkaXN0L2VzJyxcclxuICAgICAgICBtaW5pZnk6IGZhbHNlLCAvLyBlc2J1aWxkIHRlcnNlclxyXG4gICAgICAgIC8vIHRlcnNlck9wdGlvbnM6e1xyXG4gICAgICAgIC8vICAgICBjb21wcmVzczp7fSxcclxuICAgICAgICAvLyAgICAgZm9ybWF0Ont9LFxyXG4gICAgICAgIC8vICAgICBtYW5nbGU6e31cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgXHJcbiAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vaW5kZXgudHMnKSxcclxuICAgICAgICAgICAgbmFtZTogJ1RveUVsZW1lbnQnLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogJ2luZGV4JyxcclxuICAgICAgICAgICAgZm9ybWF0czogWydlcyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgICAgICAgICAgICAndnVlJyxcclxuICAgICAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXHJcbiAgICAgICAgICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXHJcbiAgICAgICAgICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImluZGV4LmNzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rSW5mby50eXBlID09PSBcImFzc2V0XCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgL1xcLihjc3MpJC9pLnRlc3QoY2h1bmtJbmZvLm5hbWUgYXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aGVtZS9bbmFtZV0uW2V4dF1cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNodW5rSW5mby5uYW1lIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBcdTUyMDZcdTUzMDVcclxuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3BhY2thZ2VzL2hvb2tzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdob29rcydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL3V0aWxzXCIpIHx8IGlkLmluY2x1ZGVzKFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndXRpbHMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgYC9wYWNrYWdlcy9jb21wb25lbnRzLyR7aXRlbX1gKSkgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXHRveS1lbGVtZW50c1xcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFx0b3ktZWxlbWVudHNcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFxcXFxob29rc1BsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvdG95LWVsZW1lbnRzL3BhY2thZ2VzL2NvcmUvYnVpbGQvaG9va3NQbHVnaW4udHNcIjtpbXBvcnQgeyBlYWNoLGlzRnVuY3Rpb24gfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJztcclxuXHJcblxyXG5pbnRlcmZhY2UgUGx1Z2luIHtcclxuICAgIHJtRmlsZXM/OiBzdHJpbmdbXTtcclxuICAgIGJlZm9yZUJ1aWxkPzpGdW5jdGlvbjtcclxuICAgIGFmdGVyQnVpbGQ/OkZ1bmN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhvb2tzUGx1Z2luKHtybUZpbGVzLGJlZm9yZUJ1aWxkLGFmdGVyQnVpbGR9OlBsdWdpbil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdob29rcy1wbHVnaW4nLFxyXG4gICAgICAgIGJ1aWxkU3RhcnQ6KCk9PntcclxuICAgICAgICAgICAgLy8gXHU1MjIwXHU5NjY0XHU2NENEXHU0RjVDXHJcbiAgICAgICAgICAgIGVhY2gocm1GaWxlcywoZk5hbWUpPT4gc2hlbGwucm0oJy1yZicsZk5hbWUpKTtcclxuICAgICAgICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkRW5kOihlcnI/OkVycm9yKT0+e1xyXG4gICAgICAgICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFDNVYsU0FBUyxTQUFTLG1CQUFtQjtBQUNyQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxVQUFVLFFBQVEsS0FBSyxPQUFPLGFBQWE7QUFFcEQsT0FBT0EsWUFBVzs7O0FDUnVTLFNBQVMsTUFBSyxrQkFBa0I7QUFDelYsT0FBTyxXQUFXO0FBU0gsU0FBUixZQUE2QixFQUFDLFNBQVEsYUFBWSxXQUFVLEdBQVM7QUFDeEUsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sWUFBVyxNQUFJO0FBRVgsV0FBSyxTQUFRLENBQUMsVUFBUyxNQUFNLEdBQUcsT0FBTSxLQUFLLENBQUM7QUFDNUMsaUJBQVcsV0FBVyxLQUFLLFlBQVk7QUFBQSxJQUMzQztBQUFBLElBQ0EsVUFBUyxDQUFDLFFBQWE7QUFDbkIsT0FBQyxPQUFPLFdBQVcsVUFBVSxLQUFLLFdBQVc7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFDSjs7O0FEdEJBLElBQU0sbUNBQW1DO0FBWXpDLElBQU0sd0JBQXdCO0FBRTlCLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUN4QyxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFDdkMsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBRXhDLFNBQVMsbUJBQW1CLFVBQWtCO0FBQzFDLFFBQU0sVUFBVSxZQUFZLFVBQVUsRUFBRSxlQUFlLEtBQUssQ0FBQztBQUU3RCxTQUFPO0FBQUEsSUFDSCxPQUFPLFNBQVMsQ0FBQyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQUEsSUFDOUMsQ0FBQyxVQUFVLE1BQU07QUFBQSxFQUNyQjtBQUNKO0FBQ0EsU0FBUyxhQUFZO0FBQ2pCLFVBQVEsbUJBQW1CLENBQUMsUUFBUTtBQUNoQyxRQUFJLElBQUssUUFBTyxNQUFNLFlBQVkscUJBQXFCO0FBQ3ZELFVBQU0sTUFBTUMsT0FBTSxHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFBQSxFQUN0RCxDQUFDO0FBQ0o7QUFFQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxZQUFNO0FBQUEsTUFDRixTQUFRLENBQUMsYUFBWSxnQkFBZSxjQUFjO0FBQUEsTUFDbEQsWUFBVztBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0gsVUFBVTtBQUFBLFFBQ1IsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsY0FBYyxVQUFVLENBQUMsS0FBSztBQUFBLFFBQzlCLGVBQWU7QUFBQSxRQUNmLFFBQVEsU0FBUyxJQUFJO0FBQUEsUUFDckIsYUFBYTtBQUFBLFVBQ1gsUUFBUSxLQUFLLFVBQVUsS0FBSztBQUFBLFVBQzVCLFNBQVMsS0FBSyxVQUFVLE1BQU07QUFBQSxVQUM5QixTQUFTLEtBQUssVUFBVSxNQUFNO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxRQUFRLENBQUM7QUFBQSxRQUNULFVBQVUsQ0FBQztBQUFBLFFBQ1gsVUFBVSxDQUFDO0FBQUEsTUFDYjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBLFFBQ04saUJBQWlCO0FBQUEsUUFDakIsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNQO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNUixjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsTUFDRCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDbEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFVBQVU7QUFBQSxRQUNOO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzNCLGNBQUksVUFBVSxTQUFTLGFBQWE7QUFDaEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FDSSxVQUFVLFNBQVMsV0FDbkIsWUFBWSxLQUFLLFVBQVUsSUFBYyxHQUMzQztBQUNFLG1CQUFPO0FBQUEsVUFDWDtBQUNBLGlCQUFPLFVBQVU7QUFBQSxRQUNyQjtBQUFBO0FBQUEsUUFFQSxhQUFhLElBQUk7QUFDYixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDN0IsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsaUJBQWlCLEdBQUc7QUFDaEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsaUJBQWlCLEtBQUssR0FBRyxTQUFTLDBCQUEwQixHQUFHO0FBQzNFLG1CQUFPO0FBQUEsVUFDWDtBQUNBLHFCQUFXLFFBQVEsbUJBQW1CLGVBQWUsR0FBRztBQUNwRCxnQkFBSSxTQUFTLElBQUksd0JBQXdCLElBQUksRUFBRSxFQUFHLFFBQU87QUFBQSxVQUM3RDtBQUFBLFFBRUo7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJzaGVsbCIsICJzaGVsbCJdCn0K
