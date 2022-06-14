<template>
  <div>
    <div class="layout-header">
    </div>
    <n-layout class="layout flex" has-sider v-if="!detail">
      <n-layout-sider bordered class="layout-sider center">
        <n-skeleton v-if="loadingChecked" text :repeat="10" size="small" width="90%" />
        <n-checkbox-group v-else v-model:value="dateChecked" @update:value="clickCheck">
          <n-space vertical align="center">
            <n-checkbox label="全选" />
            <n-checkbox v-for="item of dateList" :value="item" :label="item" />
          </n-space>
        </n-checkbox-group>
      </n-layout-sider>
      <n-layout class="layout-content">
        <n-layout-content>
          <template v-if="loading" v-for="i in 10" >
            <n-skeleton text style="width: 250px" size="medium" />
            <n-skeleton text :repeat="3" size="small" />
          </template>
          <template v-else v-for="item of showList" >
            <ArticleCard 
              :article.sync="item"
              @readArticle="readArticle"
            />
          </template>
        </n-layout-content>
        <n-layout-footer>
          <n-pagination
            v-if="articleLen"
            :item-count="articleLen"
            @update:page="changePage"
          />
        </n-layout-footer>
      </n-layout>
    </n-layout>
    <Detail v-else />
    <div class="layout-footer">
      <p>外部链接</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ArticleCard } from '@/components/Article';
  import { computed, onMounted, ref, toRef, unref } from 'vue';
  import { useArticleStore } from '@/store/modules/articles';
  import Detail from './components/detail.vue';

  const articleStore = useArticleStore();
  const articleList = ref([]); // 文章列表
  const showList = ref([]); // 展示文章列表
  const dateList = ref([]); // 日期列表
  const dateChecked = ref([]); // 已选中日期列表
  const loading = ref(true);
  const loadingChecked = ref(true);
  const dateMap = new Map();
  const articleMap = new Map();
  const detail = ref(false);

  let currentPage = 0;

  const articleLen = computed(() => {
    return unref(articleList).length;
  });

  function changePage(key: number) {
    initList(key - 1);
  }

  function readArticle(value: boolean) {
    detail.value = value;
  }

  function clickCheck() {
    articleList.value = [];
    unref(dateChecked).forEach((item) => {
      const keys = dateMap.get(item);
      keys.forEach((key) => {
        articleList.value.push(articleMap.get(key));
      })
    });
    initList(currentPage);
    console.log(showList.value, articleList);
  }

  // 计算当前页面展示文章列表
  function initList(key: number) {
    loading.value = true;
    currentPage = key;
    showList.value = [];
    for(let i = key * 10;i < (key + 1) * 10 && i < articleLen.value;i++) {
      showList.value.push(articleList.value[i]);
    }
    setTimeout(() => {
      loading.value = false;
    }, 200);
  }

  function generator() {
    unref(articleList).forEach((item) => {
      articleMap.set(item.key, item);
      const dateArray = item.date.split('-');
      const date = dateArray[0] + '年' + dateArray[1] + '月';
      if (!dateMap.has(date)) {
        dateMap.set(date, [item.key]);
      } else {
        dateMap.get(date).push(item.key);
      }
    });
    for(const item of dateMap.keys()) {
      dateList.value.push(item);
    }
    dateList.value.sort((a, b) => {
      return b > a ? 1 : -1;
    });
  }


  onMounted(async () => {
    await articleStore.generateArticles();
    articleList.value = articleStore.getArticles;
    initList(0);
    generator();
    loading.value = false;
    loadingChecked.value = false;
  })
</script>

<style lang="less" scoped>
  .layout {
    display: flex;

    &-sider {
      flex: 1 0 400px;
    }

    &-content {
      flex: 1 1 auto;
    }
  }
</style>