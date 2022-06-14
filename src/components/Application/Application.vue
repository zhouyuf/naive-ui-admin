<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot slog="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
  } from 'naive-ui';

  export default defineComponent({
    name: 'Application',
    components: {
      NLoadingBarProvider,
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
    },
    setup() {
      return {};
    },
  });
</script>