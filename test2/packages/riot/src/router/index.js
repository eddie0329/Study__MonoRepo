import Vue from "vue";
import VueRouter from "vue-router";

const view = (path) => () => import(`@/views/${path}.vue`);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: view('Home'),
  },
  {
    path: "/about",
    name: "About",
    component: view('About')
  },
];

export default () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
