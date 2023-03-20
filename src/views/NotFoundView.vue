<template>
  <div id="not-found-parent">
    <div id="not-found-card">
      <h1>{{ $t('basePage.404.title') }} - 404</h1>
      <p>{{ $t('basePage.404.text') }}</p>
      <span>
        <button @click="goBack" data-testid="goBack">{{ $t('basePage.404.goBack') }}</button>
        <button @click="goHome" data-testid="goHome">{{ $t('basePage.404.goHome') }}</button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push('/');
    },
  },
});
</script>

<style scoped>
#not-found-parent {
  display: grid;
  place-items: center;
  height: 90vh;
}

#not-found-card {
  background-color: #fff;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
  text-align: center;
}

button {
  background-color: #2ecc71;
  border: none;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

/*
    Slow color animation for button
*/
button {
  animation: color-change 2s infinite;
}
@keyframes color-change {
  0% {
    background-color: #2ecc71;
  }
  50% {
    background-color: #2cbe69;
  }
  100% {
    background-color: #2ecc71;
  }
}

button:hover {
  background-color: #27ae60;
  animation: none;
}
</style>
