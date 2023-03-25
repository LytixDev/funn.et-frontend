<template>
  <router-link to="/create-listing">{{ $t('navigation.createListing') }}</router-link>
  <div class="listing-grid">
    <div v-for="listing in listings" :key="listing.id" class="listing-div">
      <listing-card :listingData="listing" data-testid="listing-card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListingDTO } from '@/api/backend';
import ListingCard from './ListingCard.vue';1

const { listings } = defineProps({ listings: { type: Object as () => ListingDTO[] } });
</script>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

.listing-div {
  height: 450px;
  margin-top: 5px;
  border-radius: 5px;
}
</style>
