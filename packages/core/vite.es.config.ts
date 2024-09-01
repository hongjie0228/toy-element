import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
import { includes, filter, map } from "lodash-es";
// 用于生成类型文件
import dts from 'vite-plugin-dts';


function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });
  
    return map(
      filter(entries, (entry) => entry.isDirectory()),
      (entry) => entry.name
    );
  }

export default defineConfig({
    plugins: [vue(), dts({
        tsconfigPath: '../../tsconfig.build.json',
        outDir: 'dist/types'
    })],
    build: {
        outDir: 'dist/es',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'ToyElement',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'vue',
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'index.css';
                    return assetInfo.name as string;
                },
                // 分包
                manualChunks(id) {
                    if(id.includes('node_modules')){
                        return 'vendor'
                    }
                    if(id.includes('/packages/hooks') ){
                        return 'hooks'
                    }
                    if(id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")){
                        return 'utils'
                    }
                    for (const item of getDirectoriesSync("../components")) {
                        if (includes(id, `/packages/components/${item}`)) return item;
                      }
                    // for(const item of COMP_NAMES){
                    //     if(id.includes(`packages/components/${item}`)){
                    //         return item
                    //     }
                    // }
                    // console.log("id:", id);
                    // if (includes(id, "node_modules")) return "vendor";

                    // if (includes(id, "/packages/hooks")) return "hooks";

                    // if (    
                    //     includes(id, "/packages/utils") ||
                    //     includes(id, "plugin-vue:export-helper")
                    // )
                    //     return "utils";

                    // for (const item of getDirectoriesSync("../components")) {
                    //     if (includes(id, `/packages/components/${item}`)) return item;
                    // }
                }
            },
        }
    }
})