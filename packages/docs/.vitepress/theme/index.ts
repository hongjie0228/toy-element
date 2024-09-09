import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import ToyElement from "toy-elements";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";


import '@vitepress-demo-preview/component/dist/style.css'

import "toy-elements/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(ToyElement);
  },
};
