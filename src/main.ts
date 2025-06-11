import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(ArcoVue);
app.use(pinia);

app.mount("#app");
