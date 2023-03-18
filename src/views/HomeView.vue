<template>
  <base-page-view>
    <h1>{{ $t('hello') }}</h1>
  </base-page-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasePageView from '@/views/BasePageView.vue';
export default defineComponent({
  components: { BasePageView },
});
</script>

<style scoped></style>
