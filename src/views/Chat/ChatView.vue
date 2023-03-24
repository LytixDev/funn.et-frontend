<template>
  <Suspense>
    <template #fallback>
      <h2>{{ $t('ChatView.loading') }}</h2>
    </template>
    <Chat />
  </Suspense>
</template>

<script setup lang="ts">
import Chat from '@/components/Chat/Chat.vue';
</script>
