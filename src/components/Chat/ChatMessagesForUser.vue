<template>
  <div v-if="!!chats && chats?.length > 0" class="chats_wrapper">
    <div class="chat_box" v-for="chat in chats" :key="chat.id">
      <router-link
        class="chat_link"
        :key="$route.path"
        :to="{ name: 'chat', params: { id: chat.listingId, username: chat.messager.username } }">
        {{ userToDisplay(chat.messager.username, chat.listingUser.username) }}
      </router-link>
    </div>
  </div>
  <div v-else class="empty-body">
    <h3>{{ $t('UserDetailView.chats.empty') }}</h3>
    <router-link :to="{ name: 'home' }" class="to-listings-router">
      {{ $t('UserDetailView.chats.findListings') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ChatDTO } from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

const { chats } = defineProps({
  chats: { type: Array<ChatDTO> },
});

const userToDisplay = (username: string | undefined, listingUsername: string | undefined): string => {
  if (username === undefined || listingUsername === undefined) {
    return '';
  }
  return username === userStore.username ? listingUsername : username;
};
</script>

<style scoped>
.chats_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.chat_box {
  padding: 2em;
  margin-bottom: 5px;
  border-radius: 4px;
}

.empty-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.to-listings-router,
.chat_link {
  margin: 2em 0.5em;
  padding: 1em 2em;
  border-radius: 4px;
  background-color: var(--primary-color);
  text-align: center;
}

h3 {
  margin-bottom: 10px;
}
</style>
