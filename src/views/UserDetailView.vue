<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('UserDetailView.loading') }}</h2>
    </template>
    <UserDetail />
  </Suspense>
</template>

<script setup lang="ts">
import UserDetail from '@/components/User/UserDetail.vue';
</script>
