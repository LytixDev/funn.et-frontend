<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('UserDetailView.loading') }}</h2>
    </template>
    <div>
      <UserContent />
      <accordion-item :expanded="expandedChats" @click="clickOnAccordion('chats')">
        <template #header>
          <h2>Active chats</h2>
        </template>
        <Suspense>
          <chat-messages-for-user />
          <template #fallback>
            <h4>Loading cats...</h4>
          </template>
        </Suspense>
      </accordion-item>
      <accordion-item :expanded="expandedFavorites" @click="clickOnAccordion('favorites')">
        <template #header>
          <h2>Favorite listings</h2>
        </template>
        <Suspense>
          <favorite-listing-by-user />
          <template #fallback>
            <h4>Loading favorites...</h4>
          </template>
        </Suspense>
      </accordion-item>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import UserContent from '@/components/User/UserContent.vue';
import AccordionItem from '@/components/Misc/AccordionItem.vue';
import ChatMessagesForUser from '@/components/Chat/ChatMessagesForUser.vue';
import FavoriteListingByUser from '@/components/User/FavoriteListingsByUser.vue';
import { ref } from 'vue';

const expandedChats = ref(false);
const expandedFavorites = ref(false);

// Function to open accordion but close others
const clickOnAccordion = (accordion: string): void => {
  if (accordion === 'chats') {
    expandedChats.value = !expandedChats.value;
    expandedFavorites.value = false;
  } else if (accordion === 'favorites') {
    expandedFavorites.value = !expandedFavorites.value;
    expandedChats.value = false;
  }
};
</script>

<style scoped></style>
