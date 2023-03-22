<template>
  <header id="navigation-bar">
    <nav>
      <ul>
        <li>
          <router-link to="/">{{ $t('navigation.home') }}</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link to="/register">{{ $t('navigation.register') }}</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link  to="/login">{{ $t('navigation.login') }}</router-link>
        </li>
        <li v-else>
          <router-link to="/signout">{{ $t('navigation.signout') }}</router-link>
        </li>
        <li>
          <router-link to="/create-listing">create listing</router-link>
        </li>
      </ul>
      <locale-selector />
    </nav>
  </header>
</template>

<script setup lang="ts">
import LocaleSelector from '@/components/BasePage/LocaleSwitcher.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { ref } from 'vue';

const user = useUserInfoStore();
const loggedIn = ref(user.isLoggedIn);
</script>

<style scoped>
#navigation-bar {
  position: sticky;
}
</style>
