<template>
  <div>
    <n-image 
      v-for="item of pictureList"
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </div>
</template>

<script lang="ts" setup>
  import { usePictureStore } from '@/store/modules/pictures';
  import { ref, onMounted } from 'vue';

  const pictureStore = usePictureStore();
  const pictureList = ref([]);

  onMounted(async () => {
    await pictureStore.generatePictures();
    pictureList.value = pictureStore.getPictures;
  });
</script>

<style scoped>

</style>