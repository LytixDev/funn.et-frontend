<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('ListingDetailView.loading') }}</h2>
    </template>
    <ListingDetail />
  </Suspense>
</template>

<script setup lang="ts">
import ListingDetail from '@/components/Listing/ListingDetail.vue';
</script>

<style scoped></style>
