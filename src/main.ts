import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(ArcoVue);
