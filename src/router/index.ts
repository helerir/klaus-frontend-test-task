import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Create router and add routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
