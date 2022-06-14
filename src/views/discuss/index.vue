<template>
  <n-space vertical>
    <n-form
      :model="inputMessage"
      ref="formRef"
      :rules="rules"
    >
      <n-form-item path="message">
        <NInput
          placeholder="..."
          v-model:value="inputMessage.message"
          @keyup:enter="send"
        />
      </n-form-item>
      <n-form-item>
        <NButton type="success" @click="send">
          Send
        </NButton>
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts" setup>
  import { socket } from '@/api/socketio';
  import { useDiscussStore } from '@/store/modules/discuss';
  import { onMounted, ref, reactive} from 'vue';

  const discussStore = useDiscussStore();
  const discussList = ref([]);

  const inputMessage = reactive({
    message: '',
  });

  const rules = {
    message: { required: true, trigger: blur },
  }

  function send() {
    // console.log(unref(inputMessage.value));
    discussStore.sendMessage(inputMessage);
  }

  onMounted(async () => {
    socket.on('message', (data) => {
      console.log(data);
    });
    await discussStore.generateDiscussList();
    discussList.value = discussStore.getDiscussList;
    // console.log(discussList.value);
  });
  
</script>

<style scoped>

</style>