<template>
  <div class="signout-user-view form">
    <h1>{{ $t('SignoutUserView.titleSignedOut') }}</h1>
    <router-link class="attention" :to="{ name: 'home' }">{{ $t('SignoutUserView.goToHomePageLink') }}</router-link>
    <router-link :to="{ name: 'login' }">{{ $t('SignoutUserView.goToLoginPageLink') }}</router-link>
    <router-link :to="{ name: 'register' }">{{ $t('SignoutUserView.goToRegisterPageLink') }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();
userStore.clearUserInfo();
</script>

<style scoped>
.signout-user-view a {
  margin: 1em;
}
</style>
