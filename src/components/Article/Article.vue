<template>
  <NCard
    :title="title"
    :segmented="{
      content: 'soft',
      footer: 'soft',
    }"
  >
    <div class="article-text" @click="readArticle">
      <n-ellipsis line-clamp="2">
        {{ text }}
        <template #tooltip>
          <div style="text-align: center">
            详情
          </div>
        </template>
      </n-ellipsis>
    </div>
    <template #footer>
      {{ date }}
    </template>
  </NCard>
</template>

<script lang="ts">
  import { defineComponent, unref, toRefs, ref, computed } from "vue";
  import {
    NEllipsis
  } from 'naive-ui';
  import { useArticleStore } from "@/store/modules/articles";
  import { useRouter } from "vue-router";

  const props = {
      article: {
        type: Object,
        default: {
          date: '',
          title: '',
          text: '',
        }
      }
  };

  export default defineComponent({
    name: 'article-card',
    props,
    emits: ['readArticle'],
    components: {
      NEllipsis,
    },
    setup(props, { emit }) {
      const { article } = props;
      const articleStore = useArticleStore();
      const router = useRouter();

      function readArticle() {
        articleStore.setCurrentArticle(article);
        emit('readArticle', true);
      }

      return {
        ...article,
        readArticle,
      };
    }
  })
</script>

<style scoped>
  .article-text:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>