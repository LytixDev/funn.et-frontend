<template>
  <div class="signout-user-view">
    <h1>{{ $t('SignoutUserView.titleSignedOut') }}</h1>
    <span>
      <router-link :to="{ name: 'home' }">{{ $t('SignoutUserView.goToHomePageLink') }}</router-link>
      <router-link :to="{ name: 'login' }">{{ $t('SignoutUserView.goToLoginPageLink') }}</router-link>
      <router-link :to="{ name: 'register' }">{{ $t('SignoutUserView.goToRegisterPageLink') }}</router-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

onMounted(() => {
  userStore.clearUserInfo();
});
</script>

<style scoped></style>
