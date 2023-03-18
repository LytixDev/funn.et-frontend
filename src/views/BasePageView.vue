<script lang="ts">
import Footer from '@/components/BasePage/Footer.vue';
import Header from '@/components/BasePage/Header.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<template>
  <Header />
  <slot></slot>
  <Footer />
</template>

<style scoped></style>
