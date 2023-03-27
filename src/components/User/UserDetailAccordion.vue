<template>
  <div class="accordions">
    <accordion-item :expanded="expandedChats" @click="clickOnAccordion('chats')">
      <template #header>
        <h2>{{ $t('UserDetailView.chats.title') }}</h2>
      </template>
      <chat-messages-for-user :chats="openChats" />
    </accordion-item>
    <accordion-item :expanded="expandedFavorites" @click="clickOnAccordion('favorites')">
      <template #header>
        <h2>{{ $t('UserDetailView.favorites.title') }}</h2>
      </template>
      <user-connected-listings :listings="favoriteListings" listings-type="favorites" />
    </accordion-item>
    <accordion-item :expanded="expandedCreatedListings" @click="clickOnAccordion('createdListings')">
      <template #header>
        <h2>{{ $t('UserDetailView.createdListings.title') }}</h2>
      </template>
      <user-connected-listings :listings="createdListings" listings-type="createdListings" />
    </accordion-item>
  </div>
</template>

<script setup lang="ts">
import AccordionItem from '@/components/Misc/AccordionItem.vue';
import ChatMessagesForUser from '@/components/Chat/ChatMessagesForUser.vue';
import UserConnectedListings from '@/components/User/UserConnectedListings.vue';
import { ref } from 'vue';
import { ListingDTO, ListingControllerService, ChatControllerService, ChatDTO } from '@/api/backend';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

const router = useRouter();

const errorStore = useErrorStore();

const expandedChats = ref(false);
const expandedFavorites = ref(false);
const expandedCreatedListings = ref(false);

const { username } = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const openChats = ref([] as ChatDTO[] | undefined);
const favoriteListings = ref([] as ListingDTO[] | undefined);
const createdListings = ref([] as ListingDTO[] | undefined);

ChatControllerService.getChats()
  .then((chats) => {
    chats = chats?.filter((chat) => !(chat.listingUser.username === username && chat.messager === username));
    openChats.value = chats;
  })
  .catch((error) => {
    if (error.status === 401) {
      setTimeout(() => {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }, 100);
    }
    const message = handleUnknownError(error);
    errorStore.addError(message);
  });
ListingControllerService.getFavoriteListings()
  .then((listings) => {
    favoriteListings.value = listings;
  })
  .catch((error) => {
    if (error.status === 401) {
      setTimeout(() => {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }, 100);
    }
    const message = handleUnknownError(error);
    errorStore.addError(message);
  });
ListingControllerService.getListingsByUser({ username: username })
  .then((listings) => {
    createdListings.value = listings;
  })
  .catch((error) => {
    if (error.status === 401) {
      setTimeout(() => {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }, 100);
    }
    const message = handleUnknownError(error);
    errorStore.addError(message);
  });

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
  margin: 1em;
  padding: 2em;
  width: min(100%, 1300px);
  border-radius: 3%;
  border-left: 0.2em solid var(--primary-color);
  border-right: 0.2em solid var(--primary-color);
}
</style>
