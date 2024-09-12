import App from './App'
import $app from "./common/app.js"
import $timer from "./common/timer.js"; 
import { createSSRApp } from 'vue'
import pageLoading from "./components/pageloading.vue";

import goTop from "./components/go-top.vue";

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.app = $app; 
  app.config.globalProperties.timer = $timer; 
  app.component("page-loading",pageLoading);
  app.component("go-top",goTop);
  return {
    app
  }
}
