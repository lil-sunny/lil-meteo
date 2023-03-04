import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/index-page";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:date",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
