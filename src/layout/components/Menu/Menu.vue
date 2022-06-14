<template>
  <NMenu
    :options="menus" 
    mode="horizontal"
    @update:value="clickMenuItem"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, reactive, computed, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { generatorMenu } from "@/utils";
  import { useAsyncRouteStore } from "@/store/modules/asyncRoute";

  export default defineComponent({
    name: 'HeadMenu',
    emits: ['clickMenuItem'],
    setup(props, { emit }) {
      const currentRoute = useRoute();
      const router = useRouter();
      const menus = ref<any[]>([]);
      const asyncRouteStore = useAsyncRouteStore();

      watch(
        () => currentRoute.fullPath,
        () => {
          updateMenu();
          const matched = currentRoute.matched;
        }
      );

      function updateMenu() {
        menus.value = generatorMenu(asyncRouteStore.getMenus);
      }

      function clickMenuItem(key: string) {
        if (/http(s)?:/.test(key)) {
          window.open(key);
        } else {
          router.push({ name: key });
        }
        emit('clickMenuItem' as any, key);
      }

      onMounted(() => {
        updateMenu();
      });

      return {
        menus,
        clickMenuItem,
      };
    },
  });
</script>