import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "./store";

Vue.config.productionTip = false;

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");

  return { app, router, store }
};
