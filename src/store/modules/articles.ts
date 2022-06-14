import { defineStore } from "pinia";
import { getArticles } from '@/api/http/';

export interface articleState {
  articles: any[];
  currentArticle: any;
};

export const useArticleStore = defineStore({
  id: 'article',
  state: (): articleState => ({
    articles: [],
    currentArticle: {},
  }),
  getters: {
    getArticles(): any[] {
      return this.articles;
    },
    getCurrentArticle(): any {
      return this.currentArticle;
    }
  },
  actions: {
    setArticles(articles) {
      this.articles = articles;
    },
    setCurrentArticle(article) {
      this.currentArticle = article;
    },
    async generateArticles() {
      const { data } = await getArticles();
      const { result } = data.result;
      // console.log(result);
      this.setArticles(result);
    },
  },
});