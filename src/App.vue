<template>
  <NConfigProvider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="datezhCN"
  >
    <NGlobalStyle />
      <AppProvider>
        <RouterView />
      </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { AppProvider } from '@/components/Application';
</script>

<style lang="less" scoped>
  .layout {

  }
</style>
