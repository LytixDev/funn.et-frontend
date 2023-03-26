<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('UserDetailView.loading') }}</h2>
    </template>
    <UserContent />
  </Suspense>
</template>

<script setup lang="ts">
import UserContent from '@/components/User/UserContent.vue';
</script>
