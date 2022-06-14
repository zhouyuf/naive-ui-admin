<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useAsyncRouteStore } from "@/store/modules/asyncRoute";

  export default defineComponent({
    name: 'MainView',
    components: {},
    setup() {
      const asyncRouteStore = useAsyncRouteStore();
      const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
      return {
        keepAliveComponents,
      };
    },
  });
</script>