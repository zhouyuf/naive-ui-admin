<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header>
        {{ title }}
      </n-layout-header>
      <n-layout-content>
        {{ text }}
      </n-layout-content>
      <n-layout-footer>

      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useArticleStore } from "@/store/modules/articles";

  export default defineComponent({
    name: 'article-detail',
    setup() {
      const articleStore = useArticleStore();
      const article = articleStore.getCurrentArticle;

      return {
        ...article,
      }
    },
  });

</script>