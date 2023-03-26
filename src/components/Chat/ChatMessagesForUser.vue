<template>
  <div>
    <div class="item" v-for="chat in chats" :key="chat.id">
      <router-link
        class="item__link"
        :key="$route.path"
        :to="{ name: 'chat', params: { id: chat.listingId, username: chat.messager.username } }">
        {{ userToDisplay(chat.messager.username, chat.listingUser.username) }}
      </router-link>
    </div>
  </div>
  <error-box :error="errorMessage" />
</template>

<script setup lang="ts">
import { ChatDTO, ChatControllerService, ApiError } from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import ErrorBox from '../Exceptions/ErrorBox.vue';

const userStore = useUserInfoStore();

const errorMessage = ref('');
const chats = ref([] as ChatDTO[] | undefined);

const userToDisplay = (username: string | undefined, listingUsername: string | undefined): string => {
  if (username === undefined || listingUsername === undefined) {
    return '';
  }
  return username === userStore.username ? listingUsername : username;
};

try {
  chats.value = await ChatControllerService.getChats();
} catch (error) {
  if (error instanceof AxiosError) {
    errorMessage.value = error.code!!;
  }
  if (error instanceof ApiError) {
    errorMessage.value = error.body.detail;
  } else {
    errorMessage.value = 'ErrorWithContext';
  }
}
</script>
