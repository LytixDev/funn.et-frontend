<template>
  <div class="favorites-wrapper">
    <listing-list :listings="listings" v-if="!!listings && listings?.length > 0" />
    <div v-else class="empty-body">
      <h3>{{ $t('UserDetailView.favorites.empty') }}</h3>
      <router-link :to="{ name: 'home' }" class="to-listings-router">
        {{ $t('UserDetailView.favorites.findListings') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListingDTO } from '@/api/backend';
import ListingList from '@/components/Listing/ListingList.vue';

const { listings } = defineProps({
  listings: { type: Array<ListingDTO> },
});
</script>

<style scoped>
.favorites-wrapper {
  align-items: center;
  justify-content: center;
  height: 100%;
}

.empty-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.to-listings-router {
  margin: 2em 0;
  padding: 1em 2em;
  border: none;
  border-radius: 4px;
  text-decoration: none;
}

h3 {
  margin-bottom: 10px;
}
</style>
