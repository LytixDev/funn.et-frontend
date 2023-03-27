<template>
  <error-box :error-message="errorStore.getFirstError" @update:errorMessage="errorStore.removeCurrentError" />
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue';
import { useErrorStore } from '@/stores/ErrorStore';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const errorStore = useErrorStore();

onErrorCaptured((err, _vm, _info): boolean => {
  const message = handleUnknownError(err);
  errorStore.addError(message);
  return false;
});
</script>

<style scoped></style>
