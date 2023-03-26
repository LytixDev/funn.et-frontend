<template>
  <div class="accordions">
    <accordion-item :expanded="expandedChats" @click="clickOnAccordion('chats')">
      <template #header>
        <h2>{{ $t('UserDetailView.chats.title') }}</h2>
      </template>
      <chat-messages-for-user :chats="chats" />
    </accordion-item>
    <accordion-item :expanded="expandedFavorites" @click="clickOnAccordion('favorites')">
      <template #header>
        <h2>{{ $t('UserDetailView.favorites.title') }}</h2>
      </template>
      <listings-by-user :listings="favoriteListings" listings-type="favorites" />
    </accordion-item>
    <accordion-item :expanded="expandedCreatedListings" @click="clickOnAccordion('createdListings')">
      <template #header>
        <h2>{{ $t('UserDetailView.createdListings.title') }}</h2>
      </template>
      <listings-by-user :listings="createdListings" listings-type="createdListings" />
    </accordion-item>
  </div>

  <error-box v-model="errorMessage" />
</template>

<script setup lang="ts">
import AccordionItem from '@/components/Misc/AccordionItem.vue';
import ChatMessagesForUser from '@/components/Chat/ChatMessagesForUser.vue';
import ListingsByUser from '@/components/User/ListingsByUser.vue';
import { ref } from 'vue';
import { ListingDTO, ListingControllerService, ChatControllerService, ChatDTO, ApiError } from '@/api/backend';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { AxiosError } from 'axios';

const expandedChats = ref(false);
const expandedFavorites = ref(false);
const expandedCreatedListings = ref(false);

const errorMessage = ref('');

const favoriteListings = ref([] as ListingDTO[] | undefined);
const chats = ref([] as ChatDTO[] | undefined);
const createdListings = ref([] as ListingDTO[] | undefined);

try {
  favoriteListings.value = await ListingControllerService.getFavoriteListings();
  chats.value = await ChatControllerService.getChats();
} catch (error) {
  if (error instanceof ApiError) {
    errorMessage.value = error.body.detail!!;
  } else if (error instanceof AxiosError) {
    errorMessage.value = error.code!!;
  } else {
    errorMessage.value = 'ContextErrorMessage';
  }
}

// Function to open accordion but close others
const clickOnAccordion = (accordion: string): void => {
  if (accordion === 'chats') {
    expandedChats.value = !expandedChats.value;
    expandedFavorites.value = false;
    expandedCreatedListings.value = false;
  } else if (accordion === 'favorites') {
    expandedFavorites.value = !expandedFavorites.value;
    expandedChats.value = false;
    expandedCreatedListings.value = false;
  } else if (accordion === 'createdListings') {
    expandedCreatedListings.value = !expandedCreatedListings.value;
    expandedChats.value = false;
    expandedFavorites.value = false;
  }
};
</script>

<style scoped>
h2 {
  margin: 0;
  text-decoration: none;
  font-weight: 700;
}

.accordions {
  margin: 4em 20em;
  padding: 2em;
  width: min(100%, 1700px);
}
</style>
