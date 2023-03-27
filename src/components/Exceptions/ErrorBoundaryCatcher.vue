<template>
  <error-box v-model="errorMessage" />
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import { useErrorStore } from '@/stores/ErrorStore';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const errorStore = useErrorStore();

const errorMessage = ref(`Exceptions.${errorStore.getFirstError}`);

onErrorCaptured((err, _vm, _info): boolean => {
  const error = handleUnknownError(err);
  return false;
});
</script>

<style scoped>
/* Fixed component modal for error */
</style>
