<template>
  <n-layout>
    <n-layout-header class="center">
        <AsideMenu />
    </n-layout-header>
    <n-layout-content :native-scrollbar="false">
      <MainView />
    </n-layout-content>
    <n-layout-footer>
      
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
  import { AsideMenu } from './components/Menu';
  import { MainView } from './components/Main';
  import { useRoute } from 'vue-router';

  const currentRoute = useRoute();
  
</script>

<style lang="less" scoped>
  .layout {

  }
</style>