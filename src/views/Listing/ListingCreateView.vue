<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('ListingDetailView.loading') }}</h2>
    </template>
    <ListingCreate />
  </Suspense>
</template>

<script setup lang="ts">
import ListingCreate from '@/components/Listing/ListingCreate.vue';
</script>
