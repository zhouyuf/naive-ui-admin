import { createApp } from 'vue';
import App from './App.vue';
import { setupNaive } from '@/plugins';
import { setupRouter, router } from '@/router';
import { useStore } from '@/store'
import { setupStore } from './store';

async function bootstrap() {
  const app = createApp(App);

  //注册全局常用的naive-ui组件
  setupNaive(app);

  //挂载状态管理
  setupStore(app);

  //挂载路由
  await setupRouter(app);
  
  //路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app');
}

void bootstrap();