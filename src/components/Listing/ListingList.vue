<template>
  <div class="listing-grid">
    <listing-card v-for="listing in listings" :key="listing.id" :listingData="listing" data-testid="listing-card" />
  </div>
</template>

<script setup lang="ts">
import { ListingDTO } from '@/api/backend';
import ListingCard from './ListingCard.vue';
1;

const { listings } = defineProps({ listings: { type: Object as () => ListingDTO[] } });
</script>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
