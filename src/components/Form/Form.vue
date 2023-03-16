<template>
  <div class="form_wrapper">
    <form class="form_inner" :id="formId" :data-testid="dataTestId">
      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    formId: {
      type: String,
      required: true,
    },
    dataTestId: {
      type: String,
      required: false,
    },
  },
});
</script>

<style></style>
