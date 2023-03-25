<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('ListingDetailView.loading') }}</h2>
    </template>
    <listing-update />
  </Suspense>
</template>

<script setup lang="ts">
import ListingUpdate from '@/components/Listing/ListingEdit.vue';
</script>
