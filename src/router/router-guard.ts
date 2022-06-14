import { Router } from "vue-router";
import { useAsyncRouteStoreWithOut } from "@/store/modules/asyncRoute";

export function createRouterGuards(router: Router) {
  const asyncRouteStore = useAsyncRouteStoreWithOut();

  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null;
    Loading && Loading.start();

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    asyncRouteStore.generateRoutes();
    //console.log(to, from, next);
    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    asyncRouteStore.setDynamicAddedRoute(true);
    next(nextData);
    Loading && Loading.finish();
  });

  router.afterEach(async () => {

  });

  router.onError((error) => {
    console.log('路由错误', error);
  });
};
