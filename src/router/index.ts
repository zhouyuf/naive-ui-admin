import { App } from "vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { Layout } from "./constant";
import { createRouterGuards } from "./router-guard";

const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: Array<RouteRecordRaw> = [] 
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || [];
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
  //console.log(mod);
});

function sortRoute(a, b) {
  return (a.meta.sort || 0) - (b.meta.sort || 0);
};

routeModuleList.sort(sortRoute);

export const asyncRoute = routeModuleList;

export const constantRouter = [...asyncRoute];

export const router = createRouter({
  history: createWebHistory(''),
  routes: constantRouter,
  strict: true,
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router);
}