<template>
  <error-boundary-catcher>
    <template #default>
      <router-view />
    </template>
  </error-boundary-catcher>
</template>

<script setup lang="ts">
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue';
</script>

<style scoped></style>
