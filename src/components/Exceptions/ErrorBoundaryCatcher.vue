<template>
  <div class="error-boundary">
    <slot v-if="errorMessage" name="fallback">
      <div>
        <h3>{{ $t('Exceptions.ExceptionOccurred') }}</h3>
        <p>{{ $t(`Exceptions.${errorMessage}`, errorContext) }}</p>
      </div>
    </slot>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ApiError } from '@/api/backend';
import { AxiosError } from 'axios';
import { onErrorCaptured, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const errorMessage = ref('');
const errorContext = ref({} as { [key: string]: string });

onErrorCaptured((err, _vm, _info): boolean => {
  errorContext.value = {};
  if (err instanceof ApiError) {
    if (err.status == 401) {
      errorMessage.value = err.body.detail;
      router.push({ name: 'Login' });
      return false;
    }
    errorMessage.value = err.body.detail;
  } else if (err instanceof AxiosError) {
    errorMessage.value = err.code!!;
  } else if (err instanceof Error) {
    errorMessage.value = 'ErrorWithContext';
    errorContext.value = { message: err === undefined || err === null ? 'ContextErrorMessage' : err.message };
  }
  return false;
});
</script>

<style scoped>

</style>
