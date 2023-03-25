<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('ListingDetailView.loading') }}</h2>
    </template>
    <listing-edit />
  </Suspense>
</template>

<script setup lang="ts">
import listingEdit from '@/components/Listing/ListingEdit.vue';
</script>
