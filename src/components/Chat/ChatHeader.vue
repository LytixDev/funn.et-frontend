<template>
  <h2 class="chat__header">{{ $t('ChatView.title') }} {{ userToDisplay(chatData, username) }}</h2>
</template>

<script lang="ts">
import { ChatDTO } from '@/api/backend';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatHeader',
  props: {
    chatData: {
      type: Object as () => ChatDTO,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  methods: {
    userToDisplay(chatData: ChatDTO, username: string): string {
      if (
        username === undefined ||
        chatData.messager.username === undefined ||
        chatData.listingUser.username === undefined
      )
        return '';
      return chatData.messager.username === username ? chatData.listingUser.username : chatData.messager.username;
    },
  },
});
</script>

<style scoped>
.chat__header {
  padding: 0;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-primary);
}
</style>
