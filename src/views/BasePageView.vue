<script setup lang="ts">
import Footer from '@/components/BasePage/Footer.vue';
import Header from '@/components/BasePage/Header.vue';
</script>

<template>
  <Header />
  <div class="app-wrapper">
    <div class="app-content">
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  min-height: 90vh;
  height: max(100%, 100vh);
}

.app-content {
  width: var(--content-width);
  min-width: var(--content-width);
  display: flex;
  justify-content: center;
}
</style>
