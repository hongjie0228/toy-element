// vite.es.config.ts
import { defineConfig } from "file:///D:/codes/toy-elements/node_modules/.pnpm/vite@5.4.2_@types+node@20.16.1/node_modules/vite/dist/node/index.js";
import { readdirSync } from "fs";
import vue from "file:///D:/codes/toy-elements/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.2_@types+node@20.16.1__vue@3.4.38_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { includes, filter, map } from "file:///D:/codes/toy-elements/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import dts from "file:///D:/codes/toy-elements/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.16.1_rollup@4.21.0_typescript@5.5.4_vite@5.4.2_@types+node@20.16.1_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\codes\\toy-elements\\packages\\core";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types"
  })],
  build: {
    outDir: "dist/es",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFx0b3ktZWxlbWVudHNcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZXNcXFxcdG95LWVsZW1lbnRzXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGVzL3RveS1lbGVtZW50cy9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHJlYWRkaXJTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBpbmNsdWRlcywgZmlsdGVyLCBtYXAgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbi8vIFx1NzUyOFx1NEU4RVx1NzUxRlx1NjIxMFx1N0M3Qlx1NTc4Qlx1NjU4N1x1NEVGNlxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RGlyZWN0b3JpZXNTeW5jKGJhc2VQYXRoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVudHJpZXMgPSByZWFkZGlyU3luYyhiYXNlUGF0aCwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pO1xyXG4gIFxyXG4gICAgcmV0dXJuIG1hcChcclxuICAgICAgZmlsdGVyKGVudHJpZXMsIChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSksXHJcbiAgICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3Z1ZSgpLCBkdHMoe1xyXG4gICAgICAgIHRzY29uZmlnUGF0aDogJy4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxyXG4gICAgICAgIG91dERpcjogJ2Rpc3QvdHlwZXMnXHJcbiAgICB9KV0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIG91dERpcjogJ2Rpc3QvZXMnLFxyXG4gICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL2luZGV4LnRzJyksXHJcbiAgICAgICAgICAgIG5hbWU6ICdUb3lFbGVtZW50JyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnNcIixcclxuICAgICAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhc3luYy12YWxpZGF0b3JcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHVua0luZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtJbmZvLnR5cGUgPT09IFwiYXNzZXRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChjaHVua0luZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGhlbWUvW25hbWVdLltleHRdXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2h1bmtJbmZvLm5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIFx1NTIwNlx1NTMwNVxyXG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlkLmluY2x1ZGVzKCcvcGFja2FnZXMvaG9va3MnKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2hvb2tzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy91dGlsc1wiKSB8fCBpZC5pbmNsdWRlcyhcInBsdWdpbi12dWU6ZXhwb3J0LWhlbHBlclwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndXRpbHMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgYC9wYWNrYWdlcy9jb21wb25lbnRzLyR7aXRlbX1gKSkgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yKGNvbnN0IGl0ZW0gb2YgQ09NUF9OQU1FUyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGlkLmluY2x1ZGVzKGBwYWNrYWdlcy9jb21wb25lbnRzLyR7aXRlbX1gKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaWQ6XCIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaW5jbHVkZXMoaWQsIFwibm9kZV9tb2R1bGVzXCIpKSByZXR1cm4gXCJ2ZW5kb3JcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGluY2x1ZGVzKGlkLCBcIi9wYWNrYWdlcy9ob29rc1wiKSkgcmV0dXJuIFwiaG9va3NcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaW5jbHVkZXMoaWQsIFwiL3BhY2thZ2VzL3V0aWxzXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGluY2x1ZGVzKGlkLCBcInBsdWdpbi12dWU6ZXhwb3J0LWhlbHBlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGluY2x1ZGVzKGlkLCBgL3BhY2thZ2VzL2NvbXBvbmVudHMvJHtpdGVtfWApKSByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxvQkFBb0I7QUFDeFUsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixTQUFTLFVBQVUsUUFBUSxXQUFXO0FBRXRDLE9BQU8sU0FBUztBQU5oQixJQUFNLG1DQUFtQztBQVN6QyxTQUFTLG1CQUFtQixVQUFrQjtBQUMxQyxRQUFNLFVBQVUsWUFBWSxVQUFVLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFFN0QsU0FBTztBQUFBLElBQ0wsT0FBTyxTQUFTLENBQUMsVUFBVSxNQUFNLFlBQVksQ0FBQztBQUFBLElBQzlDLENBQUMsVUFBVSxNQUFNO0FBQUEsRUFDbkI7QUFDRjtBQUVGLElBQU8seUJBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLFFBQVE7QUFBQSxFQUNaLENBQUMsQ0FBQztBQUFBLEVBQ0YsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0QsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUN0QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2xCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osZ0JBQWdCLENBQUMsY0FBYztBQUMzQixjQUFJLFVBQVUsU0FBUyxhQUFhO0FBQ2hDLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQ0UsVUFBVSxTQUFTLFdBQ25CLFlBQVksS0FBSyxVQUFVLElBQWMsR0FDekM7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTyxVQUFVO0FBQUEsUUFDdkI7QUFBQTtBQUFBLFFBRUEsYUFBYSxJQUFJO0FBQ2IsY0FBRyxHQUFHLFNBQVMsY0FBYyxHQUFFO0FBQzNCLG1CQUFPO0FBQUEsVUFDWDtBQUNBLGNBQUcsR0FBRyxTQUFTLGlCQUFpQixHQUFHO0FBQy9CLG1CQUFPO0FBQUEsVUFDWDtBQUNBLGNBQUcsR0FBRyxTQUFTLGlCQUFpQixLQUFLLEdBQUcsU0FBUywwQkFBMEIsR0FBRTtBQUN6RSxtQkFBTztBQUFBLFVBQ1g7QUFDQSxxQkFBVyxRQUFRLG1CQUFtQixlQUFlLEdBQUc7QUFDcEQsZ0JBQUksU0FBUyxJQUFJLHdCQUF3QixJQUFJLEVBQUUsRUFBRyxRQUFPO0FBQUEsVUFDM0Q7QUFBQSxRQW9CTjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
