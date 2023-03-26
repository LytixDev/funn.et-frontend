<template>
  <div class="listings-wrapper">
    <listing-list :listings="listings" v-if="!!listings && listings?.length > 0" />
    <div v-else class="empty-body">
      <h3>{{ $t(`UserDetailView.${listingsType}.empty`) }}</h3>
      <router-link :to="{ name: linkOnEmpty }" class="to-listings-router">
        {{ $t(`UserDetailView.${listingsType}.findListings`) }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListingDTO } from '@/api/backend';
import ListingList from '@/components/Listing/ListingList.vue';
import { PropType, computed } from 'vue';

const { listings, listingsType } = defineProps({
  listings: { type: Array<ListingDTO> },
  listingsType: { type: String as PropType<'createdListings' | 'favorites'>, required: true },
});

const linkOnEmpty = computed(() => (listingsType === 'createdListings' ? 'create-listing' : 'home'));
</script>

<style scoped>
.listings-wrapper {
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
  margin: 2em 0.5em;
  padding: 1em 2em;
  border-radius: 4px;
  background-color: var(--primary-color);
  text-align: center;
}

h3 {
  margin: 1em;
}
</style>
