import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { store, key } from "@/store";
// import styles
import "@/assets/scss/main.scss";

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount("#app");
