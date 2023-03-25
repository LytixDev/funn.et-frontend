<template>
  <div :class="messageClass">
    <div class="message__bubble">
      <div class="message-content">
        <div class="message__text">{{ messageData.message }}</div>
        <div class="message-time">{{ timeAgo(messageData.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MessageDTO } from '@/api/backend/models/MessageDTO';

export default defineComponent({
  name: 'Message',
  props: {
    messageData: {
      type: Object as () => MessageDTO,
      required: true,
    },
    messageClass: {
      type: String,
      required: true,
    },
  },
  methods: {
    timeAgo(time: string | undefined): string {
      if (!time) return '';
      const date = new Date(time);
      const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) return interval + ' ' + this.$t('ChatView.years') + ' ' + this.$t('ChatView.ago');
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) return interval + ' ' + this.$t('ChatView.months') + ' ' + this.$t('ChatView.ago');
      interval = Math.floor(seconds / 86400);
      if (interval > 1) return interval + ' ' + this.$t('ChatView.days') + ' ' + this.$t('ChatView.ago');
      interval = Math.floor(seconds / 3600);
      if (interval > 1) return interval + ' ' + this.$t('ChatView.hours') + ' ' + this.$t('ChatView.ago');
      interval = Math.floor(seconds / 60);
      if (interval > 1) return interval + ' ' + this.$t('ChatView.minutes') + ' ' + this.$t('ChatView.ago');
      return Math.floor(seconds) + ' ' + this.$t('ChatView.seconds') + ' ' + this.$t('ChatView.ago');
    },
  },
});
</script>

<style scoped>
.message__bubble {
  margin: 0.25rem;
  padding: 0.5rem;
}

.message__text {
  max-width: calc(--content-width - 2 * var(--spacing-2));
  word-break: break-all;
  overflow-wrap: break;
  padding: 0.5rem;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  background-color: var(--primary-color);
  color: white;
}
</style>
