import { defineStore } from "pinia";
import { getPictures } from "@/api/http";

export interface PictureState {
  data: string[];
  type: string;
  size: string;
};

export const usePictureStore = defineStore({
  id: 'pictures',
  state: (): PictureState => ({
    data: [],
    type: '',
    size: '',
  }),
  getters: {
    getPictures(): string[] {
      return this.data;
    },
    getType(): string {
      return this.type;
    },
    getSize(): string {
      return this.size;
    }
  },
  actions: {
    setPictures(data: string[]) {
      this.data = data;
    },
    setType(type: string) {
      this.type = type;
    },
    setSize(size: string) {
      this.size = size;
    },
    async generatePictures() {
      const { data } = await getPictures();
      const { result, type, size } = data.result;
      this.setPictures(result);
      // console.log(this.data, result, data);
      this.setType(type);
      this.setSize(size);
    },
  },
});