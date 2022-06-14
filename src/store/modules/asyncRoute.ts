import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { asyncRoute } from "@/router";
import { toRaw } from "vue";
import { store } from '@/store';

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
};

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: asyncRoute,
    addRouters: [],
    keepAliveComponents: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setRouters(routers: any[]) {
      this.addRouters = routers;
      this.routers = asyncRoute.concat(routers);
    },
    setMenus(menus: any[]) {
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: string[]) {
      this.keepAliveComponents = compNames;
    },
    async generateRoutes() {
      this.setRouters([]);
      this.setMenus(asyncRoute[0].children);
    }
  }
});

export function useAsyncRouteStoreWithOut() {
  return useAsyncRouteStore(store);
}
