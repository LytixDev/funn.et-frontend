<script setup lang="ts">
import { useUserInfoStore } from './stores/UserStore';

let user = useUserInfoStore();

if (user.isLoggedIn) {
  console.log(user.username + ' is logged in');
} else {
  console.log('User is not logged in');
}

</script>

<template>
  <router-view />
</template>

<style scoped>
</style>
