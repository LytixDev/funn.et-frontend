<template>
  <base-page-view>
    <h1>{{ $t('hello') }}</h1>
  </base-page-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasePageView from '@/views/BasePageView.vue';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
export default defineComponent({
  components: { BasePageView, ErrorBox },
});
</script>

<style scoped></style>
