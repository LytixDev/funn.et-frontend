<template>
  <error-boundary-catcher>
    <router-view />
  </error-boundary-catcher>
</template>

<script setup lang="ts">
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue';
</script>

<style scoped></style>
