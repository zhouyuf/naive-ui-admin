import { getDiscuss } from "@/api/http";
import { sendMessage } from "@/api/socketio";
import { defineStore } from "pinia";

interface DiscussType {
  discussList: [],

};

export const useDiscussStore = defineStore({
  id: 'discuss',
  state: (): DiscussType => ({
    discussList: [],
  }),
  getters: {
    getDiscussList(): any[] {
      return this.discussList;
    },
  },
  actions: {
    setDiscussList(discussList: any) {
      this.discussList = discussList;
    },
    async generateDiscussList() {
      const { data } = await getDiscuss();
      const { result } = data.result;
      this.setDiscussList(result);
    },
    async sendMessage(params) {
      const { message } = params;
      sendMessage({ message });
      await this.generateDiscussList(); 
    },
  },
});