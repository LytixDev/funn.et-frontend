<template>
  <div class="user-detail-wrapper">
    <Suspense>
      <template #fallback>
        <h2>{{ $t('UserDetailView.loading') }}</h2>
      </template>
      <user-content />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import UserContent from '@/components/User/UserContent.vue';
</script>

<style scoped>
.user-detail-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: min(100%, 1300px);
}
</style>
